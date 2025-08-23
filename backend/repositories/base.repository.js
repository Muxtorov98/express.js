class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async findAll(filter = {}, options = {}) {
    return this.model.find(filter, null, options);
  }

  async findAllLean(filter = {}, options = {}) {
    return this.model.find(filter, null, options).lean();
  }

  async findOne(filter, projection = {}, options = {}) {
    return this.model.findOne(filter, projection, options);
  }

  async findOneLean(filter, projection = {}, options = {}) {
    return this.model.findOne(filter, projection, options).lean();
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async findByIdLean(id) {
    return this.model.findById(id).lean();
  }

  async findByIdAndUpdate(id, data, options = { new: true }) {
    return this.model.findByIdAndUpdate(id, data, options);
  }

  async findByIdAndDelete(id) {
    return this.model.findByIdAndDelete(id);
  }

  async paginate(filter = {}, { page = 1, limit = 10, populate = [] }, baseUrl = "") {
    const skip = (page - 1) * limit;
    const query = this._buildQuery(filter, skip, limit, populate);
    const [data, totalCount] = await Promise.all([
      query.lean().exec(), // lean qo‘shdik → tezroq bo‘ladi
      this.model.countDocuments(filter),
    ]);
    const meta = this._getPaginationMeta(totalCount, page, limit);
    const links = this._getPaginationLinks(baseUrl, page, limit, meta.pageCount);
    return { data, _meta: meta, _links: links };
  }

  _buildQuery(filter, skip, limit, populate) {
    let query = this.model.find(filter).skip(skip).limit(limit);
    if (Array.isArray(populate) && populate.length > 0) {
      populate.forEach((p) => {
        query = query.populate(p);
      });
    }
    return query;
  }

  _getPaginationMeta(totalCount, page, limit) {
    const pageCount = Math.ceil(totalCount / limit);
    return {
      totalCount,
      pageCount,
      currentPage: page,
      perPage: limit,
    };
  }

  _getPaginationLinks(baseUrl, page, limit, pageCount) {
    const createUrl = (p) =>
      p >= 1 && p <= pageCount ? `${baseUrl}?page=${p}&limit=${limit}` : null;
    return {
      self: createUrl(page),
      first: createUrl(1),
      last: createUrl(pageCount),
      next: page < pageCount ? createUrl(page + 1) : null,
      prev: page > 1 ? createUrl(page - 1) : null,
    };
  }
}

module.exports = BaseRepository;
