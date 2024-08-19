import ContentSection from "./sections/ContentSection";
import NavSection from "./sections/NavSection";

interface HomepageProps {
  projects: {
    source: string;
    title: string;
    description: string;
    link: string;
    preview: string;
  }[];
}

const Homepage: React.FC<HomepageProps> = ({ projects }) => {
  return (
    <div>
      {projects.map((project, index) => (
        <ContentSection
          key={index}
          isRight={index % 2 !== 0}
          source={project.source}
          title={project.title}
          description={project.description}
          link={project.link}
          preview={project.preview}
        />
      ))}
      <NavSection />
    </div>
  );
};

export default Homepage;
