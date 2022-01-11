export class Book {
    constructor(title, author, description, pages, currentPage, read) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.pages = pages;
        this.currentPage = currentPage;
        this.read = read;
    }
    readBook(page) {
        if (page < 1 || page > this.pages) {
            return 0;
        } else if (page >= 1 && page < this.pages) {
            this.currentPage = page;
            return 1;
        } else if (page = this.pages) {
            this.currentPage = page;
            this.read = true;
            return 1;
        }
    }
}

export const books = [
    new Book("Titre1", "Author1", "description1", 100, 1, false),
    new Book("Titre2", "Author2", "description2", 200, 1, false),
    new Book("Titre3", "Author3", "description3", 300, 1, false)
];