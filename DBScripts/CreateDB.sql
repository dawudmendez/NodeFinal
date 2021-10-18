CREATE SCHEMA `ecommerce`;

USE ecommerce;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `categorias`
--

CREATE TABLE `categorias` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`) VALUES
(1, 'Electrodomésticos'),
(7, 'Herramientas'),
(8, 'Muebles');

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `id` bigint(20) NOT NULL,
  `codigo` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `precio` decimal(50,2) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `idcategoria` bigint(20) NOT NULL,
  `destacado` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`id`, `codigo`, `nombre`, `precio`, `descripcion`, `idcategoria`, `destacado`) VALUES
(1, 'MAR-1234', 'Martillo', '2500.50', 'Martillo Manual', 7, 1),
(2, 'COC-1234', 'Cocina', '25000.50', 'Cocina Conventry', 1, 1),
(3, 'ROP-1234', 'Ropero', '32000.50', 'Ropero Placard', 8, 1),
(4, 'MES-1234', 'Mesa', '5000.50', 'Mesa Ratona', 8, 1),
(5, 'CAM-1234', 'Cucheta', '5000.50', 'Cama Cucheta', 8, 1),
(6, 'LAV-1234', 'Lavarropas', '5000.50', 'Lavarropas Candy', 1, 0),
(7, 'PLAN-1234', 'Plancha', '5000.50', 'Plancha Automática', 1, 0),
(8, 'KIT-1234', 'Kitchenaid', '5000.90', 'Kitchenaid Heavy Duty', 1, 0),
(9, 'MAS-1234', 'Masa', '3000.50', 'Masa rompe paredes', 7, 0);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` bigint(20) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usuarios`
--
--
-- Indexes for dumped tables
--

--
-- Indexes for table `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productos_categorias_idx` (`idcategoria`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_categorias` FOREIGN KEY (`idcategoria`) REFERENCES `categorias` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
