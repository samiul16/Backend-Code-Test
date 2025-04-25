import { loadData } from "../../../src/lib/utils.js";

export const getNode = (nodeId) => {
  const allNodes = loadData("nodes.json");
  if (!allNodes.length) return {};

  let node = allNodes.find((node) => node._id === nodeId);
  if (!node) return {};

  if (node.parentIds && node.parentIds.length) {
    const parents = node.parentIds.map((id) => {
      return allNodes.find((node) => node._id === id);
    });
    node = {
      ...node,
      parents,
    };
  }

  if (node.triggerId) {
    const allTriggers = loadData("triggers.json");
    const trigger = allTriggers.find((node) => node._id === node.triggerId);
    node = {
      ...node,
      trigger,
    };
  }

  if (node.responseIds && node.responseIds.length) {
    const allResponses = loadData("responses.json");
    const responses = node.responseIds.map((id) => {
      return allResponses.find((node) => node._id === id);
    });
    node = {
      ...node,
      responses,
    };
  }

  if (node.actionIds && node.actionIds.length) {
    const allActions = loadData("actions.json");
    const actions = node.actionIds.map((id) => {
      return allActions.find((node) => node._id === id);
    });
    node = {
      ...node,
      actions,
    };
  }

  return node;
};
