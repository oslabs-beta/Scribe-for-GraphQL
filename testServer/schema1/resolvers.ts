const resolvers: Object = {
  Mutation: {
    createBook: (parent, { title, authorId, genre }) => {
      const book = { id: String(books.length + 1), title, authorId, genre };
      books.push(book);
      return book;
    },
    updateBook: (parent, { id, title, authorId, genre }) => {
      const bookIndex = books.findIndex((book) => book.id === id);
      if (bookIndex === -1) throw new Error(`No book with id ${id}`);
      const book = { ...books[bookIndex], title, authorId, genre };
      books[bookIndex] = book;
      return book;
    },
    deleteBook: (parent, { id }) => {
      const bookIndex = books.findIndex((book) => book.id === id);
      if (bookIndex === -1) throw new Error(`No book with id ${id}`);
      const deletedBook = books.splice(bookIndex, 1)[0];
      return deletedBook;
    },
    createUser: (parent, { name, email, age, favoriteBookId }) => {
      const user = {
        id: String(users.length + 1),
        name,
        email,
        age,
        favoriteBookId,
      };
      users.push(user);
      return user;
    },
    updateUser: (parent, { id, name, email, age, favoriteBookId }) => {
      const userIndex = users.findIndex((user) => user.id === id);
      if (userIndex === -1) throw new Error(`No user with id ${id}`);
      const user = { ...users[userIndex], name, email, age, favoriteBookId };
      users[userIndex] = user;
      return user;
    },
    deleteUser: (parent, { id }) => {
      const userIndex = users.findIndex((user) => user.id === id);
      if (userIndex === -1) throw new Error(`No user with id ${id}`);
      const deletedUser = users.splice(userIndex, 1)[0];
      return deletedUser;
    },
  },
  Book: {
    author: (parent) => authors.find((author) => author.id === parent.authorId),
  },
  Author: {
    books: (parent) => books.filter((book) => book.authorId === parent.id),
  },
  User: {
    favoriteBook: (parent) => {
      if (!parent.favoriteBookId) return null;
      return books.find((book) => book.id === parent.favoriteBookId);
    },
  },
};

const books = [
  { id: "1", title: "The Great Gatsby", authorId: "1", genre: "Fiction" },
  { id: "2", title: "To Kill a Mockingbird", authorId: "2", genre: "Fiction" },
  { id: "3", title: "The Catcher in the Rye", authorId: "3", genre: "Fiction" },
  { id: "4", title: "1984", authorId: "4", genre: "Fiction" },
  { id: "5", title: "Pride and Prejudice", authorId: "5", genre: "Romance" },
];

const authors = [
  { id: "1", name: "F. Scott Fitzgerald" },
  { id: "2", name: "Harper Lee" },
  { id: "3", name: "J.D. Salinger" },
  { id: "4", name: "George Orwell" },
  { id: "5", name: "Jane Austen" },
];

const users = [
  {
    id: "1",
    name: "John",
    email: "john@example.com",
    age: 30,
    favoriteBookId: "1",
  },
  {
    id: "2",
    name: "Jane",
    email: "jane@example.com",
    age: 25,
    favoriteBookId: "2",
  },
  {
    id: "3",
    name: "Bob",
    email: "bob@example.com",
    age: 35,
    favoriteBookId: "3",
  },
];

module.exports = resolvers;
