import { uid } from "../utils/packages/dist/index.mjs";
import { t_task } from "../utils/types/project_types";

export async function set_storage(): Promise<{ [key: string]: any }> {
  await chrome.storage.local.set({
    tasks: [
      {
        title: "Amazon Phones",
        taskID: uid(16),
        websiteURL:
          "https://www.amazon.ae/Mobile-Phones/b?ie=UTF8&node=15415001031",
        isMultipage: false,
        taskSchema: {
          item: ".item-name",
          itemDescription: ".item-desc",
          discount: ".item-discount",
          price: ".item-price",
          currency: ".item-price-currency",
        },
      },

      {
        title: "Epoch Converter",
        taskID: uid(16),
        websiteURL: "https://www.epochconverter.com/",
        isMultipage: true,

        taskSchema: {
          title: ".title",
          description: ".desc",
          dateCreated: "june 1",
        },
      },

      {
        title: "Haru",
        taskID: uid(16),
        websiteURL: "https://www.youtube.com/watch?v=Ki6_VnABBBQ",
        isMultipage: false,
        taskSchema: {
          youtubeTitle: ".yt-title",
          description: ".desc",
          subs: "#yt-subs",
        },
      },
    ],
    scrape_calls: 0,
  });
  const user_storage = await chrome.storage.local.get();
  return user_storage;
}

export async function add_task_local_storage(new_task: t_task) {
  const { tasks } = await chrome.storage.local.get("tasks");
  console.log(tasks);
  await chrome.storage.local.set({ tasks: [new_task, ...tasks] });
}
