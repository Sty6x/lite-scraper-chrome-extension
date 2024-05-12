import { multipage_inputs } from "./ui.js";
import { t_task } from "./utils/types/project_types";

// triggered when a new task is clicked
export function update_config_ui(data: t_task) {
  const form = document.querySelector("form");
  const websiteURL_input = form?.querySelector("#websiteURL");
  const multipage_container = form?.querySelector("#multipage-container");
  const multipage_toggle = form?.querySelector(
    `input#multipageToggle`
  ) as HTMLInputElement;
  const task_schema_inputs = Array.from(
    form?.querySelectorAll(".task-schema-input") as NodeListOf<HTMLElement>
  );
  console.log({
    webURL: websiteURL_input,
    multipage_toggle: multipage_toggle.checked,
    task_schema_inputs: task_schema_inputs.map(
      (inputs_container) => inputs_container.children
    ),
  });

  const multipage_input_initializer = multipage_inputs(
    multipage_container as HTMLElement
  );
  if (!multipage_toggle.checked) {
    multipage_input_initializer.destroy();
    return;
  }
  multipage_input_initializer.create();
}
