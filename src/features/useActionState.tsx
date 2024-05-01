import { useActionState } from "react";

interface Todo {
  todo: string;
  userId: number;
  completed: boolean;
}

interface FormState {
  message: string;
  payload: Todo | null;
}

const addTodo = async (todoDetails: Todo) => {
  const response = await fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todoDetails),
  });
  return response.json();
};

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

export function AddTodoComponent() {
  const [actionState, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction}>
      <h2>Add Todo 📝</h2>

      <div>
        <label>Title</label>
        <input type="text" name="todo" disabled={isPending} />
      </div>

      <div>
        <label>Completed</label>
        <input
          type="checkbox"
          name="completed"
          value="checked"
          disabled={isPending}
        />
      </div>

      <button type="submit" disabled={isPending}>
        Add Todo
      </button>

      <p>-------------------</p>

      <div>
        {isPending ? <h4>Pending...</h4> : null}

        <h4>{actionState?.message}</h4>
        {actionState?.payload ? (
          <div>
            <p>
              <b>Title: </b>
              {actionState?.payload.todo}
            </p>
            <p>
              <b>Completed: </b>
              {actionState?.payload.completed ? "Yes" : "No"}
            </p>
          </div>
        ) : null}
      </div>
    </form>
  );
}
