import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  const todo = "Do it";
  fireEvent.change(inputTask, { target: { value: todo}})
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  fireEvent.change(inputTask, { target: { value: todo}})
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getAllByText(todo).length
  expect(check).toBe(1);

 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputDate = screen.getByRole('textbox', {name: /Add New Item/i});
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getAllByText("You have no todo's left").length;
  expect(check).toBe(1);

 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const todo = "Do it";
  fireEvent.change(inputTask, { target: { value: todo}});
  fireEvent.click(element);
  const check = screen.getAllByText("You have no todo's left").length;
  expect(check).toBe(1);
  
 });


 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  const todo = "Do it";
  fireEvent.change(inputTask, { target: { value: todo}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const box = screen.getByRole('checkbox');
  fireEvent.click(box);
  const check = screen.getAllByText("You have no todo's left").length;
  expect(check).toBe(1);
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i})
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy")
  const element = screen.getByRole('button', {name: /Add/i}) ;
  fireEvent.change(inputTask, { target: { value: "History Test"}})
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}})
  fireEvent.click(element)
  fireEvent.change(inputTask, { target: { value: "Math Test"}})
  fireEvent.change(inputDate, { target: { value: "05/30/2021"}})
  fireEvent.click(element)
  const historyCheck = screen.getByTestId(/History Test/i).style.background
  const mathCheck = screen.getByTestId(/Math Test/i).style.background
  expect(historyCheck).toBe("rgba(255, 255, 255, 1)");
  expect(mathCheck).toBe("red");
 });
