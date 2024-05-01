## Actions

By convention in React now, functions that use async transitions are called “Actions”. `<form>` elements now support passing functions to the `action` prop. Passing functions to the `action` prop use Actions by default and reset the form automatically after submission.

Where is this action coming from? It can come from one of the returned values of the `useActionState()` Hook. The `useActionState` Hook is a utility in React that manages the state transitions associated with actions tied to forms or similar components. It's designed to simplify the handling of asynchronous operations and state updates within React components. The hook accepts three parameters:

1. An `action` function, which is executed when the form action is triggered (i.e., when the form is called).
2. An initial state, which sets the starting state of the form before any user interaction.
3. [Optional] A permalink that refers to the unique page URL that this form modifies. [Fill in: Can be important...]

The hook returns three values in a tuple:

1. The current state. This object holds the current state of the action after it has been processed, including any messages or data returned by the action.
2. The action that you pass to the `action` prop of the form.
3. `isPending`. A boolean that indicates whether the action is currently being processed, useful for disabling form elements while the action is in progress to prevent duplicate submissions.

## Dummy Request

We construct a todo item from the form data and sends it to a server using an HTTP POST request. This interaction is managed through the `addTodo` function, which calls a dummy API endpoint (https://dummyjson.com/todos/add).

```ts
const addTodo = async (todoDetails: Todo) => {
  const response = await fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todoDetails),
  });
  return response.json();
};
```

## Action

```ts
const action = async (
  _: FormState | null,
  formData: FormData
): Promise<FormState> => {
  try {
    const newlyAddedTodo = await addTodo({
      todo: formData.get("todo") as string,
      userId: 5,
      completed: formData.get("completed") === "checked",
    });

    return {
      message: "Todo has successfully been added!",
      payload: newlyAddedTodo,
    };
  } catch {
    return { message: "Uh oh, Todo could not be added :(", payload: null };
  }
};
```

## Render

The template...
