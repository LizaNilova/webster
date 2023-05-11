install:
	make -C ./server install
	make -C ./webster_front install

start-server:
	@make -C ./server start-dev

start-client:
	@make -C ./webster_front start-dev