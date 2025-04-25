import { Long, JSON } from "./scalars.js";
// import { getNode } from "./modules/node/nodeHelper.js";

const resolvers = {
  Long,
  JSON,
  Query: {
    node: (_, { nodeId }, { dataSources }) => {
      return dataSources.getNodeById(nodeId);
      // return getNode(nodeId); // ALTERNATIVE APPROCH TO FETCH DATA FROM JSON FILES
    },
    nodes: (_, { limit, offset }, { dataSources }) => {
      const nodes = dataSources.getAllNodes();
      return nodes.slice(offset, offset + limit);
    },
    actions: (_, { ids }, { dataSources }) => {
      return ids
        ? ids.map((id) => dataSources.getActionById(id)).filter(Boolean)
        : dataSources.getAllActions();
    },
    action: (_, { actionId }, { dataSources }) => {
      return dataSources.getActionById(actionId);
    },
    response: (_, { responseId }, { dataSources }) => {
      return dataSources.getResponseById(responseId);
    },
    responses: (_, { ids }, { dataSources }) => {
      return ids
        ? ids.map((id) => dataSources.getResponseById(id)).filter(Boolean)
        : dataSources.getAllResponses();
    },
    trigger: (_, { triggerId }, { dataSources }) => {
      return dataSources.getTriggerById(triggerId);
    },
    triggers: (_, { ids }, { dataSources }) => {
      return ids
        ? ids.map((id) => dataSources.getTriggerById(id)).filter(Boolean)
        : dataSources.getAllTriggers();
    },
    resourceTemplate: (_, { resourceTemplateId }, { dataSources }) => {
      return dataSources.getResourceTemplateById(resourceTemplateId);
    },
    resourceTemplates: (_, { ids }, { dataSources }) => {
      return ids
        ? ids
            .map((id) => dataSources.getResourceTemplateById(id))
            .filter(Boolean)
        : dataSources.getAllResourceTemplates();
    },
  },
  NodeObject: {
    parents: (node, _, context) => {
      return (
        node.parentIds?.map((id) => context.dataSources.getNodeById(id)) || []
      );
    },
    trigger: (node, _, context) => {
      return node.triggerId
        ? context.dataSources.getTriggerById(node.triggerId)
        : null;
    },
    responses: (node, _, context) => {
      return (
        node.responseIds?.map((id) =>
          context.dataSources.getResponseById(id)
        ) || []
      );
    },
    actions: (node, _, context) => {
      return (
        node.actionIds?.map((id) => context.dataSources.getActionById(id)) || []
      );
    },
  },
  Action: {
    resourceTemplate: (action, _, context) => {
      return action.resourceTemplateId
        ? context.dataSources.getResourceTemplateById(action.resourceTemplateId)
        : null;
    },
  },
  Trigger: {
    resourceTemplate: (trigger, _, context) => {
      return trigger.resourceTemplateId
        ? context.dataSources.getResourceTemplateById(
            trigger.resourceTemplateId
          )
        : null;
    },
  },
};

export default resolvers;
