class CategoryMapper {
  toDomain(persistence) {
    return {
      id: persistence.id,
      name: persistence.name,
    };
  }
}

export default new CategoryMapper();
