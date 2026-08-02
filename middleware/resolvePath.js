import { getFolder, getRootFolder } from "../services/file.service.js";

/**
 * @desc Given a path, this middleware will find the current folder
 * the path is resolving to, and return its id from the db
 */
export async function resolvePath(req, res, next) {
  const userId = req.user.id;
  const pathArray = req.params.path;
  // First get the id of root folder for a user
  let parentFolder = await getRootFolder(userId);
  let parentFolderId = parentFolder.id;
  let folderId = parentFolderId;

  // for root folder, pathArray is falsy
  if (pathArray) {
    /* now iterate through the splat wildcard array
     * and for each item, find the folder id. It is possible because now, we
     * have the parent folder id, so we can query the correct folder row
     */
    for (let i = 0; i < pathArray.length; i++) {
      const folder = await getFolder(userId, pathArray[i], parentFolderId);
      folderId = folder.id;
      parentFolderId = folderId;
    }
  }

  /* Passing the folder id in res.locals ensures that the variable is accessible
   * for all the other middlewares after it, for that same request-response
   * cycle
   */
  res.locals.folderId = folderId;
  next(); // continue to the next middleware
}
