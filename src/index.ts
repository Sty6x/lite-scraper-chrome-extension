import Event_Signal from "./utils/pubsub.js";
import {
  add_field_handler,
  remove_field_handler,
  set_current_active_task_config,
  set_task_active,
  get_started_btn_handler,
  add_task,
  update_task_schema_input,
  update_website_url,
  init_input_buffer,
  save_input_buffer,
  eval_input_buffer,
  change_current_task,
  scrape_request,
  delete_task,
  update_task_title,
  download_scraped_data,
} from "./input_handlers.js";
import {
  replace_title_to_input,
  transition_signed_in,
  update_json_display,
  update_tasks_ui,
} from "./ui.js";
import {
  create_session_handler,
  start_session,
} from "./services/server_session.js";
import { delete_task_local_storage } from "./services/chrome_storage_api.js";
import State_Manager from "./utils/state_manager.js";
const task_content_inputs = document.getElementById(
  "task-contents",
) as HTMLDivElement;
const sidebar = document.getElementById("sidebar") as HTMLDivElement;
const add_task_btn = document.getElementById("add-task") as HTMLButtonElement;
const add_field_btn = document.getElementById(
  "add-field-btn",
) as HTMLButtonElement;
const task_schema_container = document.getElementById(
  "task-schema-container",
) as HTMLDivElement;
const get_started_btn = document.getElementById(
  "get-started-btn",
) as HTMLButtonElement;
const task_btns_container = document.getElementById(
  "title-edit-delete-btn-container",
) as HTMLSpanElement;

const scrape_button = document.getElementById(
  "scrape-button",
) as HTMLButtonElement;

const download_button = document.getElementById(
  "download-btn",
) as HTMLButtonElement;
window.addEventListener("load", start_session);

Event_Signal.subscribe("load_existing_session", transition_signed_in);
Event_Signal.subscribe(
  "create_session",
  create_session_handler,
  transition_signed_in,
);
Event_Signal.subscribe(
  "change_task_ui",
  set_task_active,
  set_current_active_task_config,
);

Event_Signal.subscribe("delete_task", async (data: any) => {
  await delete_task_local_storage(data);
});
Event_Signal.subscribe("update_task_schema_input", update_task_schema_input);
Event_Signal.subscribe("update_webURL_input", update_website_url);
Event_Signal.subscribe("update_title_input", update_task_title);
Event_Signal.subscribe("update_json_ui", update_json_display);
Event_Signal.subscribe("update_active_task_sidebar", update_tasks_ui);

task_btns_container.addEventListener("click", (e) => {
  const target = e.target as HTMLButtonElement;
  if (target.id === "delete-task") {
    delete_task();
  }
  if (target.id === "edit-task-title") {
    replace_title_to_input();
  }
});

get_started_btn.addEventListener("click", get_started_btn_handler);
add_task_btn.addEventListener("click", add_task);
sidebar.addEventListener("click", change_current_task);
add_field_btn.addEventListener("click", add_field_handler);
task_schema_container.addEventListener("click", remove_field_handler);
task_content_inputs.addEventListener("focusin", init_input_buffer);
task_content_inputs.addEventListener("keyup", save_input_buffer);
task_content_inputs.addEventListener("focusout", eval_input_buffer);
task_content_inputs.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    eval_input_buffer(e);
  }
});
scrape_button.addEventListener("click", scrape_request);
download_button.addEventListener("click", (e) => {
  const current_active_taskID = State_Manager.get_state("current_active_task");
  download_scraped_data(current_active_taskID, e);
});
