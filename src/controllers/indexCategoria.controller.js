import { pool } from "../db.js";

export const getCategorias = async (req, res) => {
    const response = await pool.query("SELECT * FROM Categoria ORDER BY id ASC");
    res.status(200).json(response.rows);
};

export const getCategoriaById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query("SELECT * FROM Categoria WHERE id = $1", [id]);
    res.json(response.rows);
};

export const createCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        const { rows } = await pool.query(
            "INSERT INTO Categoria (nombre, descripcion) VALUES ($1, $2) RETURNING *",
            [nombre, descripcion]
        );

        res.status(201).json(rows[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateCategoria = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, descripcion } = req.body;
  
    const { rows } = await pool.query(
      "UPDATE Categoria SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *",
      [nombre, descripcion, id]
    );
  
    return res.json(rows[0]);
  };
  
  export const deleteCategoria = async (req, res) => {
    const id = parseInt(req.params.id);
    const { rowCount } = await pool.query("DELETE FROM Categoria where id = $1", [
      id,
    ]);
  
    if (rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
  
    return res.sendStatus(204);
  };