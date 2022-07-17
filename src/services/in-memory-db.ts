import { Injectable } from '@nestjs/common';

interface Template {
  id: string;
}

@Injectable()
class InMemoryDb<T extends Template> {
  private list: T[] = [];

  getAll() {
    return this.list;
  }

  getById(id: string) {
    const result = this.list.find((item) => item.id === id);
    return result || null;
  }

  create(item: T) {
    this.list.push(item);
    return item;
  }

  update(id: string, receivedItem: Partial<T>) {
    const item = this.getById(id);
    if (item) {
      Object.assign(item, receivedItem);
      return item;
    }
    return null;
  }

  remove(id: string) {
    const deletedItem = this.getById(id);
    if (deletedItem) {
      this.list = this.list.filter((item) => item.id !== id);
      return deletedItem;
    }
    return null;
  }
}

export default InMemoryDb;
