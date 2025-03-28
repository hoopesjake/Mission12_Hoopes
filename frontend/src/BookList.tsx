import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

// Set base URL to avoid CORS/mixed issues
axios.defaults.baseURL = "http://localhost:5071";

interface Book {
    bookId: number;
    title: string;
    author: string;
    publisher: string;
    isbn: string;
    classification: string;
    category: string;
    pageCount: number;
    price: number;
}

const BookList = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const fetchBooks = async () => {
        try {
            const res = await axios.get("/api/books", {
                params: {
                    page,
                    pageSize,
                    sort: "title",
                },
            });
            console.log("API Response:", res.data); // Debug log
            setBooks(res.data.books); // 👈 match lowercase from backend
            setTotal(res.data.total);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [page, pageSize]);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">📚 Book List</h2>

            <div className="mb-3">
                <label className="me-2">Books per page:</label>
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPage(1);
                    }}
                >
                    {[5, 10, 15].map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>

            <table className="table table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>ISBN</th>
                        <th>Classification</th>
                        <th>Category</th>
                        <th>Pages</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {books.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="text-center">
                                No books found.
                            </td>
                        </tr>
                    ) : (
                        books.map((book) => (
                            <tr key={book.bookId}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.publisher}</td>
                                <td>{book.isbn}</td>
                                <td>{book.classification}</td>
                                <td>{book.category}</td>
                                <td>{book.pageCount}</td>
                                <td>${book.price.toFixed(2)}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center">
                <button
                    className="btn btn-primary"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>
                <span>Page {page}</span>
                <button
                    className="btn btn-primary"
                    disabled={page * pageSize >= total}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BookList;
