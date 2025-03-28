using Microsoft.AspNetCore.Mvc;
using Mission11_Hoopes.Data;
using Mission11_Hoopes.Models;

namespace Mission11_Hoopes.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BooksController : ControllerBase
{
    private readonly BookstoreContext _context;

    public BooksController(BookstoreContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetBooks([FromQuery] int page = 1, [FromQuery] int pageSize = 5, [FromQuery] string? sort = null)
    {
        var query = _context.Books.AsQueryable();

        if (!string.IsNullOrEmpty(sort) && sort.ToLower() == "title")
        {
            query = query.OrderBy(b => b.Title);
        }

        var totalItems = query.Count();
        var books = query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        return Ok(new { Total = totalItems, Books = books });
    }
}