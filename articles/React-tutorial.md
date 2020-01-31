## What is React?

## Components

* Function Components

```jsx
function Welcome(props){
	return <h1>Hello, {props.name}</h1>;
}

```

* Class Components

```jsx
class Welcome extends React.Component{
	render(){
		return <h1>Hello, {props.name}</h1>;
	}
}
```

## props, state

props 外参，来自于父类，通过调用组件传过来的
state 属于组件属性，

```jsx
class Box extends React.Component{
	constructor(props){
		super(props)
		
		this.state = {
			value: 1
		}
		
		this.handleChange = this.handleChange.bind(this)
	}
	
	handleChange(event){
		this.setState({
			value: event.target.value
		})
	}
	
	render(){
		return <h1>Hello, {props.name}</h1>;
	}
}
```
