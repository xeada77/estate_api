export const getUsers = async (req, res) => {
  try {
    res.json({ message: "Works!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to get Users!" });
  }
};
export const getUser = async (req, res) => {
  try {
    res.json({ message: "Works!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to get User!" });
  }
};
export const updateUser = async (req, res) => {
  try {
    res.json({ message: "Works!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update User!" });
  }
};
export const deleteUser = async (req, res) => {
  try {
    res.json({ message: "Works!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete User" });
  }
};
