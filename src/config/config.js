// const baseUrl = "https://my-employee-app-be.azurewebsites.net";
// const baseUrl = "http://192.168.1.109:8083";
const baseUrl = "https://terence-app-be.duckdns.org";

const employeesUrl = `${baseUrl}/api/v1/employees`;
const emailUrl = `${baseUrl}/api/v1/contact`;
// const chatUrl = `${baseUrl}/api/v1/chat/generate`;
const chatUrl = `http://localhost:11434/api/chat`;

export { baseUrl, employeesUrl, emailUrl, chatUrl };
