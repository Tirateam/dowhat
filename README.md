<img src="https://i.ibb.co/fXQDLMM/image-psd-3.png">

***

<h1 align="center">What is dowhat</h1>
<h3 align="center"> dowhat is a command executable to do some tasks, almost the same like make, but it reads a do.what file in directory where dowhat was launched</h3>

***

<h1 align="center">Syntax of the do.what file</h1>

<h3 align="center">To execute a shell command just type the command, an example:</h3>

```sh
echo "Hello"
```

<h3 align="center">You can make comments only with a # at start of a line</h3>

```python
# A comment
```

<h3 align="center">Also you can do something like this: </h3>

```js
{arg} echo "something"
```

<h3 align="center">You are probably wondering why are you doing this. Well the answer is so you can do something like this</h3>

```sh
dowhat arg
```

<h3 align="center">This will execute</h3>

```sh
echo "something"
```

<h3 align="center">Also there are variables, to create them start a new empty line and enter something like:</h3>

```sh
@variablename = "content"
```

<h3 align="center">And to use them</h3>

```sh
echo "@variablename@"
```

<h3 align="center">Expression can be done like this</h3>

```sh
[if (@variablename@ == "content")] echo "yep, its equal to content"
[if (@variablename@ == "ba")] echo "yep, its equal to ba"
```
