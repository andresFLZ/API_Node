# SCRIPT DB

CREATE TABLE "categoria"
(
	categoria_id serial NOT NULL,
	nombre varchar(50) NOT NULL,
	descripcion varchar(70) NOT NULL
)
;

CREATE TABLE "producto"
(
	producto_id serial NOT NULL,
	nombre varchar(50) NOT NULL,
	descripcion varchar(70) NOT NULL,
	precio integer NOT NULL,
	imagen varchar(500) NOT NULL,
	categoria_id serial NOT NULL
)
;

/* Create Primary Keys, Indexes, Uniques, Checks */

ALTER TABLE "Categoria" ADD CONSTRAINT "PK_Categoria"
	PRIMARY KEY (categoria_id)
;

ALTER TABLE "Producto" ADD CONSTRAINT "PK_Table1"
	PRIMARY KEY (producto_id)
;

CREATE INDEX "IXFK_Producto_Categoria" ON "Producto" (categoria_id ASC)
;

/* Create Foreign Key Constraints */

ALTER TABLE "Producto" ADD CONSTRAINT "FK_Producto_Categoria"
	FOREIGN KEY (categoria_id) REFERENCES "Categoria" (categoria_id) ON DELETE No Action ON UPDATE No Action
;
