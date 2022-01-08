/*

	Concurrency is an ability of a program to do multiple things at the same time. This means a program that have
	two or more tasks that run individually of each other, at about the same time, but remain part of the same program

	Goroutines — A goroutine is a function that runs independently of the function that started it.
	Channels — A channel is a pipeline for sending and receiving data. Channels provide a way for one goroutine
				to send structured data to another.


	Concurrency and parallelism comes into the picture when you are examining for multitasking and they are often used
	interchangeably, concurrent and parallel refer to related but different things.

	Concurrency - Concurrency is about to handle numerous tasks at once. This means that you are working to manage
				numerous tasks done at once in a given period of time. However, you will only be doing a single task
				at a time. This tends to happen in programs where one task is waiting and the program determines to
				drive another task in the idle time. It is an aspect of the problem domain — where your program needs
				to handle numerous simultaneous events.

	Parallelism - Parallelism is about doing lots of tasks at once. This means that even if we have two tasks, they
				are continuously working without any breaks in between them. It is an aspect of the solution domain
				— where you want to make your program faster by processing different portions of the problem in parallel.

	A concurrent program has multiple logical threads of control. These threads may or may not run in parallel.
	A parallel program potentially runs more quickly than a sequential program by executing different parts of the
	computation simultaneously (in parallel). It may or may not have more than one logical thread of control.

*/