// @ts-nocheck
import { writeFile } from "fs/promises";
const { args, makeRequest } = require("./common.js");

const print = (json) => {
  console.log(JSON.stringify(json, null, 2));
};

const generateOrgLinkHash = ({ href, sourcedId, type }) => {
  return `${type}-${sourcedId}`;
};

makeRequest("get", "/ims/oneroster/v1p1/orgs").then(async (response) => {
  let orgs = response.data.orgs;
  const payload = [];
  const orgLinksMap = {};
  const orgParentsMap = {};
  const orgChildrenMap = {};
  // process children first
  for (const org of orgs) {
    if (org.parent && Object.values(org.parent).length > 0) {
      const hash = generateOrgLinkHash(org.parent);
      if (orgLinksMap[hash] === undefined) {
        orgLinksMap[hash] = {
          hash,
          ...org.parent,
        };
      }
      const orgParentHash = `${org.sourcedId}-${org.parent.sourcedId}`;
      orgParentsMap[orgParentHash] = {
        hash: orgParentHash,
        orgs_sourcedId: org.sourcedId,
        orgLinks_hash: hash,
      };
      delete org.parent;
    }
    if (org.children) {
      for (const [index, child] of org.children.entries()) {
        const hash = generateOrgLinkHash(child);
        if (orgLinksMap[hash] === undefined) {
          orgLinksMap[hash] = {
            hash,
            ...child,
          };
        }
        const orgChildrenHash = `${org.sourcedId}-${child.sourcedId}`;
        orgChildrenMap[orgChildrenHash] = {
          hash: orgChildrenHash,
          orgs_sourcedId: org.sourcedId,
          orgLinks_hash: hash,
        };
      }
      delete org.children;
    }
  }

  const orgLinks = Object.values(orgLinksMap);
  const orgParents = Object.values(orgParentsMap);
  const orgChildren = Object.values(orgChildrenMap);

  await writeFile(
    `${args.outDir}/1-orgLinks.json`,
    JSON.stringify(orgLinks, null, 2),
  );
  await writeFile(`${args.outDir}/1-orgs.json`, JSON.stringify(orgs, null, 2));
  await writeFile(
    `${args.outDir}/2-orgParents.json`,
    JSON.stringify(orgParents, null, 2),
  );
  await writeFile(
    `${args.outDir}/2-orgChildren.json`,
    JSON.stringify(orgChildren, null, 2),
  );
});
