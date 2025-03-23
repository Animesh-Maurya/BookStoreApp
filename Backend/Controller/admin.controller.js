import { Admin } from "../model/admin.model.js";

const getAdminDashboard = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id)
      .populate('createdBooks')
      .populate('paid_books')
      .populate('customers');

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.json({
      role: admin.role,
      createdBooks: admin.createdBooks,
      paidBooks: admin.paid_books,
      customers: admin.customers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export {
    getAdminDashboard,
}
