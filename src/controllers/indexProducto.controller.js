import { pool } from "../db.js";

export const getProductos = async (req, res) => {
    const response = await pool.query("SELECT * FROM Producto ORDER BY id ASC");
    res.status(200).json(response.rows);
};

export const getProductoById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query("SELECT * FROM Producto WHERE id = $1", [id]);
    res.json(response.rows);
};

export const createProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, imagen, categoria_id } = req.body;

        const { rows } = await pool.query(
            "INSERT INTO Producto (nombre, descripcion, precio, imagen, categoria_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [nombre, descripcion, precio, imagen, categoria_id]
        );

        res.status(201).json(rows[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateProducto = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, descripcion, precio, imagen, categoria_id } = req.body;
  
    const { rows } = await pool.query(
      "UPDATE Producto SET nombre = $1, descripcion = $2, precio = $3, imagen = $4, categoria_id = $5 WHERE id = $6 RETURNING *",
      [nombre, descripcion, precio, imagen, categoria_id, id]
    );
  
    return res.json(rows[0]);
  };
  
  export const deleteProducto = async (req, res) => {
    const id = parseInt(req.params.id);
    const { rowCount } = await pool.query("DELETE FROM Producto where id = $1", [
      id,
    ]);
  
    if (rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
  
    return res.sendStatus(204);
  };