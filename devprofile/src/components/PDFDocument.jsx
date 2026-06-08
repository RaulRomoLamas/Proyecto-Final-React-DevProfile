import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'

const colors = {
  primary: '#2563eb',
  text: '#172033',
  muted: '#64748b',
  border: '#dbe3ef',
  surface: '#f8fbff',
}

const styles = StyleSheet.create({
  page: {
    padding: 36,
    color: colors.text,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.45,
  },
  header: {
    flexDirection: 'row',
    gap: 16,
    paddingBottom: 16,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    objectFit: 'cover',
  },
  headerContent: {
    flex: 1,
  },
  name: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 4,
  },
  profession: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 6,
  },
  contactLine: {
    color: colors.muted,
    marginBottom: 3,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: 700,
    paddingBottom: 5,
    marginBottom: 8,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  paragraph: {
    color: colors.muted,
  },
  item: {
    padding: 10,
    marginBottom: 8,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 6,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 3,
  },
  itemTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 11,
    fontWeight: 700,
  },
  itemMeta: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: 700,
  },
  tag: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: 700,
    marginBottom: 4,
  },
  linkText: {
    color: colors.primary,
    fontSize: 9,
    marginTop: 3,
  },
  projectImage: {
    width: '100%',
    height: 120,
    objectFit: 'cover',
    marginBottom: 8,
    borderRadius: 6,
  },
  twoColumns: {
    flexDirection: 'row',
    gap: 10,
  },
  column: {
    flex: 1,
  },
})

const hasValue = (value) => String(value ?? '').trim().length > 0

function TextLine({ label, value }) {
  if (!hasValue(value)) {
    return null
  }

  return (
    <Text style={styles.contactLine}>
      {label ? `${label}: ` : ''}
      {value}
    </Text>
  )
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  )
}

function SkillItem({ skill }) {
  const level = Number(skill.level) || 0

  return (
    <View style={styles.item} wrap={false}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemTitle}>{skill.name}</Text>
        {level > 0 ? <Text style={styles.itemMeta}>{level}/100</Text> : null}
      </View>
      {hasValue(skill.category) ? <Text style={styles.tag}>{skill.category}</Text> : null}
      {hasValue(skill.description) ? (
        <Text style={styles.paragraph}>{skill.description}</Text>
      ) : null}
    </View>
  )
}

function ProjectItem({ project }) {
  return (
    <View style={styles.item} wrap={false}>
      {hasValue(project.imageUrl) ? (
        <Image style={styles.projectImage} src={project.imageUrl} />
      ) : null}
      <Text style={styles.itemTitle}>{project.name}</Text>
      {hasValue(project.technologies) ? (
        <Text style={styles.tag}>{project.technologies}</Text>
      ) : null}
      {hasValue(project.description) ? (
        <Text style={styles.paragraph}>{project.description}</Text>
      ) : null}
      {hasValue(project.repositoryUrl) ? (
        <Text style={styles.linkText}>Repo: {project.repositoryUrl}</Text>
      ) : null}
      {hasValue(project.deployUrl) ? (
        <Text style={styles.linkText}>Deploy: {project.deployUrl}</Text>
      ) : null}
    </View>
  )
}

function EducationItem({ educationItem }) {
  const program = educationItem.program || educationItem.degree

  return (
    <View style={styles.item} wrap={false}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemTitle}>{program}</Text>
        {hasValue(educationItem.period) ? (
          <Text style={styles.itemMeta}>{educationItem.period}</Text>
        ) : null}
      </View>
      {hasValue(educationItem.institution) ? (
        <Text style={styles.tag}>{educationItem.institution}</Text>
      ) : null}
      {hasValue(educationItem.description) ? (
        <Text style={styles.paragraph}>{educationItem.description}</Text>
      ) : null}
      {hasValue(educationItem.evidenceUrl) ? (
        <Text style={styles.linkText}>Evidencia: {educationItem.evidenceUrl}</Text>
      ) : null}
    </View>
  )
}

function LanguageItem({ language }) {
  return (
    <View style={styles.item} wrap={false}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemTitle}>{language.name}</Text>
        {hasValue(language.level) ? <Text style={styles.itemMeta}>{language.level}</Text> : null}
      </View>
      {hasValue(language.description) ? (
        <Text style={styles.paragraph}>{language.description}</Text>
      ) : null}
    </View>
  )
}

function PDFDocument({ cvData }) {
  const personal = cvData.personal ?? {}
  const links = personal.links ?? {}
  const skills = Array.isArray(cvData.skills) ? cvData.skills : []
  const projects = Array.isArray(cvData.projects) ? cvData.projects : []
  const education = Array.isArray(cvData.education) ? cvData.education : []
  const languages = Array.isArray(cvData.languages) ? cvData.languages : []

  return (
    <Document title="DevProfile CV" author={personal.name || 'DevProfile'}>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header} wrap={false}>
          {hasValue(personal.profileImage) ? (
            <Image style={styles.avatar} src={personal.profileImage} />
          ) : null}

          <View style={styles.headerContent}>
            {hasValue(personal.name) ? <Text style={styles.name}>{personal.name}</Text> : null}
            {hasValue(personal.profession) ? (
              <Text style={styles.profession}>{personal.profession}</Text>
            ) : null}
            <TextLine label="Ubicación" value={personal.location} />
            <TextLine label="Correo" value={personal.email} />
            <TextLine label="Teléfono" value={personal.phone} />
          </View>
        </View>

        {hasValue(personal.description) ? (
          <Section title="Perfil profesional">
            <Text style={styles.paragraph}>{personal.description}</Text>
          </Section>
        ) : null}

        {hasValue(links.github) || hasValue(links.linkedin) || hasValue(links.portfolio) ? (
          <Section title="Enlaces profesionales">
            <TextLine label="GitHub" value={links.github} />
            <TextLine label="LinkedIn" value={links.linkedin} />
            <TextLine label="Portafolio" value={links.portfolio} />
          </Section>
        ) : null}

        {skills.length > 0 ? (
          <Section title="Habilidades">
            <View style={styles.twoColumns}>
              <View style={styles.column}>
                {skills
                  .filter((_, index) => index % 2 === 0)
                  .map((skill) => (
                    <SkillItem key={skill.id} skill={skill} />
                  ))}
              </View>
              <View style={styles.column}>
                {skills
                  .filter((_, index) => index % 2 === 1)
                  .map((skill) => (
                    <SkillItem key={skill.id} skill={skill} />
                  ))}
              </View>
            </View>
          </Section>
        ) : null}

        {projects.length > 0 ? (
          <Section title="Proyectos">
            {projects.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </Section>
        ) : null}

        {education.length > 0 ? (
          <Section title="Educación, cursos y certificaciones">
            {education.map((educationItem) => (
              <EducationItem key={educationItem.id} educationItem={educationItem} />
            ))}
          </Section>
        ) : null}

        {languages.length > 0 ? (
          <Section title="Idiomas">
            <View style={styles.twoColumns}>
              <View style={styles.column}>
                {languages
                  .filter((_, index) => index % 2 === 0)
                  .map((language) => (
                    <LanguageItem key={language.id} language={language} />
                  ))}
              </View>
              <View style={styles.column}>
                {languages
                  .filter((_, index) => index % 2 === 1)
                  .map((language) => (
                    <LanguageItem key={language.id} language={language} />
                  ))}
              </View>
            </View>
          </Section>
        ) : null}
      </Page>
    </Document>
  )
}

export default PDFDocument
