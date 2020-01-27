class APIFeatures {
	// query = mongoose query
	// queryString = query String coming from the route
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}

	filter() {
		// Advance API filtering
		const objQuery = {...this.queryString};
		// removing query sort,page etc
		const excludedFields = ['page', 'sort', 'limit', 'fields'];
		// we are not going to pass excludedField now we delete them
		excludedFields.forEach(el => delete objQuery[el]);

		let objQueryStr = JSON.stringify(objQuery);

		// allow to use mongo greater than equal less than equal with help of RegExpression
		// sample: localhost:9000/api/v1/users?age[lte]=20
		objQueryStr = objQueryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);


		// now query can be chained to any mongoose function
		this.query = this.query.find(JSON.parse(objQueryStr));

		// return this entire object/class so that we can chain our methods
		return this;
	}

	sort() {

		// Sorting
		// sample: localhost:9000/api/v1/users?sort=age&age[lte]=100 ASCENDING ORDER
		// or localhost:9000/api/v1/users?sort=age&age[lte]=-100 DESCENDING ORDER
		
		if (this.queryString.sort) {
			// so that we can sort multiple
			// example: localhost:9000/api/v1/users?sort=age,name just add - for DESCENDING ORDER
			const sortBy = this.queryString.sort.split(',').join(' ');
			this.query = this.query.sort(sortBy);
		} else {
			// for default it will be DESCENDING ORDER by id if no sort was given
			this.query = this.query.sort('-_id');
		}

		return this;
	}

	limitFields() {
		// Limiting fields to avoid large bandwidth on every request 
		if (this.queryString.fields) {
			// it  will display specific fields
			// example: localhost:9000/api/v1/users?fields=name,age
			const fields = this.queryString.fields.split(',').join(' ');
			this.query = this.query.select(fields);
		} else {
			// set difault fields to be display
			// default will be all fields will be displayed but will leave this else here for idea
			// use -fieldname to exclude a field
			// example: localhost:9000/api/v1/users?fields=-name
		}

		return this;
	}

	paginate() {
		// Pagination
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1 || 100;
		const skip = (page *  limit) - limit;

		this.query = this.query.skip(skip).limit(limit);

		return this;
	}
}
module.exports = APIFeatures
