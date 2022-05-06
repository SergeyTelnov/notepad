import httpService from "./http.service";

const tasksEndpoint = "task/";

const tasksService = {
  createTask: async (payload) => {
    const { data } = await httpService.post(tasksEndpoint, payload);
    return data;
  },
  getTasksById: async (pageId) => {
    const { data } = await httpService.get(tasksEndpoint, {
      params: {
        orderBy: "pageId",
        equalTo: `${pageId}`
      }
    });
    return data;
  },
  getTasks: async () => {
    const { data } = await httpService.get(tasksEndpoint);
    return data;
  },
  removeTask: async (taskId) => {
    const { data } = await httpService.delete(tasksEndpoint + taskId);
    return data;
  },
  updateTask: async (payload) => {
    const { data } = await httpService.patch(
      tasksEndpoint + payload._id,
      payload
    );
    return data;
  }
};

export default tasksService;
