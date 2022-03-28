## Cadastro de Carro

**RF** => Requisitos funcionais
Deve ser possível cadastrar um novo carro.

**RN** => Regras de negócio
Não deve ser possível cadastrar um carro com uma placa já cadastrada.
O carro deve ser cadastrado como disponível para alugar por padrão.
Apenas usuário administrador pode cadastrar um novo carro.

## Listagem de carro

**RF** => Requisitos funcionais
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN** => Regras de negócio
O usuário não precisa está logado no sistema.

## Cadastro de específicação no carro 

**RF** => Requisitos funcionais
Deve ser possível cadastrar uma especificação para um carro.

**RN** => Regras de negócio
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
Apenas usuário administrador pode cadastrar uma especificação.

## Cadastro de imagem do carro

**RF** => Requisitos funcionais
Deve ser possível cadastrar a imagem do carro.

**RNF** => Requisitos não funcionais
Utilizar o multer para upload dos arquivos.

**RN** => Regras de negócio
Apenas usuário administrador pode cadastrar uma imagem para o carro.
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.

## Aluguel de carro

**RF** => Requisitos funcionais
Deve ser possível cadastrar um aluguel.

**RN** => Regras de negócio
O usuário deve estar logado na aplicação.
O aluguel deve ter duração minima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.


