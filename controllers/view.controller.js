import { getFiles, getFolders } from "../services/file.service.js";

export async function listItems(req, res) {
  const userId = req.user.id;
  const folderId = res.locals.folderId;

  /* In Express, the req object has two important properties
   * req.baseUrl = /user/ => the url BEFORE the router paths
   * req.path = /folder1/folder2/ => the url that the router is currently handling
   * req.originalUrl could also work
   */
  const url = req.baseUrl + req.path;
  const prevUrl = getPrevUrl(url);
  const files = await getFiles(userId, folderId);
  const folders = await getFolders(userId, folderId);
  const elements = [];
  folders.forEach((item) => {
    elements.push({ name: item.name, type: "folder" });
  });
  files.forEach((item) => {
    elements.push({ name: item.name, type: "file" });
  });
  res.render("home", {
    username: res.locals.currentUser.username,
    url: url,
    prevUrl: prevUrl,
    elements: elements,
  });
}

function getPrevUrl(url) {
  return url.slice(0, url.lastIndexOf("/"));
}
