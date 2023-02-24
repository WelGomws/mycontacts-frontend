class ContactMapper {
  toPersistence(domain) {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      phone: domain.phone,
      category_id: domain.categoryId,
    };
  }

  toDomain(persistence) {
    return {
      id: persistence.id,
      name: persistence.name,
      email: persistence.email,
      phone: persistence.phone,
      category: {
        id: persistence.category_id,
        name: persistence.category_name,
      },
    };
  }
}

export default new ContactMapper();
