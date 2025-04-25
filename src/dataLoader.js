import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class DataSource {
  constructor() {
    this.actions = this.loadData("actions.json");
    this.triggers = this.loadData("triggers.json");
    this.responses = this.loadData("responses.json");
    this.resourceTemplates = this.loadData("resourceTemplates.json");
    this.nodes = this.loadData("nodes.json");
  }

  loadData(filename) {
    const data = readFileSync(join(__dirname, "../data", filename), "utf8");
    return JSON.parse(data);
  }

  getNodeById(id) {
    return this.nodes.find((node) => node._id === id);
  }

  getTriggerById(id) {
    return this.triggers.find((trigger) => trigger._id === id);
  }

  getResponseById(id) {
    return this.responses.find((response) => response._id === id);
  }

  getActionById(id) {
    return this.actions.find((action) => action._id === id);
  }

  getResourceTemplateById(id) {
    return this.resourceTemplates.find((template) => template._id === id);
  }

  getAllResourceTemplates() {
    return this.resourceTemplates;
  }

  getAllNodes() {
    return this.nodes;
  }

  getAllActions() {
    return this.actions;
  }

  getAllResponses() {
    return this.responses;
  }

  getAllTriggers() {
    return this.triggers;
  }
}

export default DataSource;
