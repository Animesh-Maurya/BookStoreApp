import { Book } from "../model/book.model.js";
import { User } from "../model/user.model.js";


const getUserCart = async (req, res) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const user = await User.findById(userId).populate("cart");  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ cart: user.cart });
    } catch (error) {
      console.error("Error fetching cart and pending books:", error);
      res.status(500).json({ message: "Server error while fetching cart and pending books" });
    }
  };
  
  
  const addPendingBook = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        if (!userId || !bookId) {
            return res.status(400).json({ message: "User ID and Book ID are required" });
        }

        // Find user and book
        const user = await User.findById(userId);
        const book = await Book.findById(bookId);

        if (!user || !book) {
            return res.status(404).json({ message: "User or Book not found" });
        }

        // Check if the book exists in the cart
        const cartIndex = user.cart.indexOf(bookId);
        if (cartIndex === -1) {
            return res.status(400).json({ message: "Book is not in the cart" });
        }

        user.pending_books.push(bookId);

        await user.save();

        res.status(200).json({ 
            message: "Book moved to pending_books successfully", 
            pending_books: user.pending_books 
        });

    } catch (error) {
        console.error("Error updating pending_books:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

  

  export{
    getUserCart,
    addPendingBook
  }