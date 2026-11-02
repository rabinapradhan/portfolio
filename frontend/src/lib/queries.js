export const PROJECTS_QUERY = `
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    status,
    cardColor,
    shortDescription,
    technologies,
    "thumbnailUrl": thumbnail.asset->url,
    "galleryUrls": gallery[].asset->url,
    githubUrl,
    demoUrl,
    overview
  }
`;

export const PROJECT_DETAIL_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    status,
    shortDescription,
    cardColor,
    technologies,
    "thumbnailUrl": thumbnail.asset->url,
    "galleryUrls": gallery[].asset->url,
    githubUrl,
    demoUrl,
    overview
  }
`;
