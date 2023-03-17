export interface ProjectData {
  key: string;
  category: string;
  title: string;
  description: string;
  technologies: string[];
  index: number;
  size: 'sm' | 'lg';
  thumbnail: string;
  github: string;
  url: string;
  content: string;
  images: string[];
}

const projectFiles = import.meta.glob('../routes/projects/**/index.md', { as: 'raw', eager: true });
const projectThumbnails = import.meta.glob('../routes/projects/**/thumbnail.{png,jpg}', {
  as: 'url',
  eager: true,
});
const projectImages = import.meta.glob('../routes/projects/**/images/*.{png,jpg}', {
  as: 'url',
  eager: true,
});

export const projects: ProjectData[] = Object.entries(projectFiles)
  .map(([key, value]) => {
    const frontmatterText = value.split('---')[1];
    const frontmatter = Object.fromEntries(
      frontmatterText.split('\n').map((line: string) => line.trim().split(': ')),
    );
    let thumbnail = projectThumbnails[key.replace('index.md', 'thumbnail.png')];
    thumbnail ??= projectThumbnails[key.replace('index.md', 'thumbnail.jpg')];
    const images = Object.entries(projectImages)
      .filter(([imageKey]) => imageKey.startsWith(key.replace('index.md', 'images/')))
      .sort(
        (a, b) =>
          parseInt(a[0].split('/').pop()?.split('.')[0] ?? '0') -
          parseInt(b[0].split('/').pop()?.split('.')[0] ?? '0'),
      )
      .map(([, imageValue]) => imageValue);
    return {
      key: key.replace('../routes/projects/', '').replace('/index.md', ''),
      category: frontmatter.category,
      title: frontmatter.title,
      description: frontmatter.description,
      technologies: frontmatter.technologies.split(', '),
      index: frontmatter.index,
      size: frontmatter.size,
      thumbnail,
      github: frontmatter.github,
      url: frontmatter.url,
      content: value.split('---')[2],
      images,
    };
  })
  .sort((a, b) => a.index - b.index);
