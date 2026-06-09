import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'

const colors = {
  navy: '#06294a',
  navyDark: '#031b32',
  gold: '#c99a45',
  text: '#172033',
  muted: '#526173',
  border: '#d6dce6',
  rule: '#eef2f7',
  white: '#ffffff',
}

const styles = StyleSheet.create({
  page: {
    position: 'relative',
    padding: 0,
    backgroundColor: colors.white,
    color: colors.text,
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    lineHeight: 1.35,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 190,
    paddingHorizontal: 22,
    paddingTop: 30,
    backgroundColor: colors.navy,
    color: colors.white,
  },
  sidebarAccent: {
    position: 'absolute',
    left: 0,
    bottom: 58,
    width: 190,
    height: 46,
    backgroundColor: colors.gold,
  },
  avatar: {
    width: 118,
    height: 118,
    borderRadius: 59,
    objectFit: 'cover',
    alignSelf: 'center',
    borderColor: colors.white,
    borderWidth: 2,
    marginBottom: 18,
  },
  sidebarName: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 1.08,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  sidebarProfession: {
    color: colors.white,
    fontSize: 10,
    lineHeight: 1.25,
    textAlign: 'center',
    marginTop: 9,
  },
  goldRuleSmall: {
    width: 28,
    height: 2,
    backgroundColor: colors.gold,
    alignSelf: 'center',
    marginTop: 11,
    marginBottom: 12,
  },
  sidebarDivider: {
    height: 1,
    backgroundColor: '#8ba4bd',
    marginVertical: 18,
  },
  sidebarSectionTitle: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase',
    marginBottom: 11,
  },
  sidebarLine: {
    color: colors.white,
    fontSize: 9,
    marginBottom: 9,
  },
  sidebarLink: {
    color: colors.white,
    fontSize: 8.5,
    marginBottom: 8,
  },
  sidebarIconRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
    marginBottom: 9,
  },
  sidebarDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.gold,
    color: colors.navy,
    fontSize: 9,
    fontWeight: 700,
    textAlign: 'center',
    paddingTop: 4,
  },
  sidebarText: {
    flex: 1,
    color: colors.white,
    fontSize: 8.8,
  },
  content: {
    marginLeft: 190,
    paddingTop: 38,
    paddingRight: 34,
    paddingBottom: 52,
    paddingLeft: 28,
  },
  section: {
    marginBottom: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
  },
  sectionIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.navy,
    color: colors.white,
    fontSize: 12,
    fontWeight: 700,
    textAlign: 'center',
    paddingTop: 7,
    marginRight: 8,
  },
  sectionTitle: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: 700,
    textTransform: 'uppercase',
    marginRight: 8,
  },
  sectionRuleWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionRule: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gold,
  },
  sectionRuleDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.gold,
    marginLeft: 4,
  },
  paragraph: {
    color: colors.text,
    fontSize: 10,
    lineHeight: 1.45,
  },
  twoColumns: {
    flexDirection: 'row',
    gap: 18,
  },
  column: {
    flex: 1,
  },
  skillItem: {
    marginBottom: 9,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 2,
  },
  skillName: {
    color: colors.navy,
    fontSize: 10,
    fontWeight: 700,
  },
  skillLevel: {
    color: colors.text,
    fontSize: 9,
  },
  skillCategory: {
    color: colors.text,
    fontSize: 8.5,
    marginBottom: 5,
  },
  skillBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#dfe5ed',
  },
  skillBarFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.navy,
  },
  card: {
    marginBottom: 10,
    padding: 11,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
  },
  projectRow: {
    flexDirection: 'row',
    gap: 12,
  },
  projectImage: {
    width: 150,
    height: 78,
    objectFit: 'cover',
    borderRadius: 6,
  },
  projectContent: {
    flex: 1,
  },
  itemTitle: {
    color: colors.navy,
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 3,
  },
  itemTag: {
    color: colors.text,
    fontSize: 8.8,
    fontWeight: 700,
    marginBottom: 5,
  },
  itemMeta: {
    color: colors.muted,
    fontSize: 8.5,
  },
  linkText: {
    color: colors.navy,
    fontSize: 8.5,
    marginTop: 3,
  },
  educationRow: {
    flexDirection: 'row',
    gap: 12,
  },
  periodBlock: {
    width: 42,
    minHeight: 72,
    borderRadius: 8,
    backgroundColor: colors.navy,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  periodText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: 700,
    textAlign: 'center',
  },
  educationContent: {
    flex: 1,
  },
  languageCard: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  languageBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.navy,
    color: colors.white,
    fontSize: 9,
    fontWeight: 700,
    textAlign: 'center',
    paddingTop: 15,
  },
  footer: {
    position: 'absolute',
    left: 190,
    right: 0,
    bottom: 0,
    height: 34,
    backgroundColor: colors.navy,
    color: colors.white,
    fontSize: 10,
    textAlign: 'center',
    paddingTop: 11,
  },
  quoteMark: {
    color: colors.gold,
    fontSize: 14,
    fontWeight: 700,
  },
})

const hasValue = (value) => String(value ?? '').trim().length > 0

function splitByColumn(items) {
  return [
    items.filter((_, index) => index % 2 === 0),
    items.filter((_, index) => index % 2 === 1),
  ]
}

function Section({ title, icon, children }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionIcon}>{icon}</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionRuleWrap}>
          <View style={styles.sectionRule} />
          <View style={styles.sectionRuleDot} />
        </View>
      </View>
      {children}
    </View>
  )
}

function SidebarLine({ icon, children }) {
  if (!hasValue(children)) {
    return null
  }

  return (
    <View style={styles.sidebarIconRow}>
      <Text style={styles.sidebarDot}>{icon}</Text>
      <Text style={styles.sidebarText}>{children}</Text>
    </View>
  )
}

function Sidebar({ personal, links }) {
  const hasLinks = hasValue(links.github) || hasValue(links.linkedin) || hasValue(links.portfolio)

  return (
    <View style={styles.sidebar} fixed>
      <View style={styles.sidebarAccent} />
      {hasValue(personal.profileImage) ? (
        <Image style={styles.avatar} src={personal.profileImage} />
      ) : null}
      {hasValue(personal.name) ? <Text style={styles.sidebarName}>{personal.name}</Text> : null}
      <View style={styles.goldRuleSmall} />
      {hasValue(personal.profession) ? (
        <Text style={styles.sidebarProfession}>{personal.profession}</Text>
      ) : null}

      <View style={styles.sidebarDivider} />
      <Text style={styles.sidebarSectionTitle}>Contacto</Text>
      <SidebarLine icon="U">{personal.location}</SidebarLine>
      <SidebarLine icon="@">{personal.email}</SidebarLine>
      <SidebarLine icon="T">{personal.phone}</SidebarLine>

      {hasLinks ? (
        <>
          <View style={styles.sidebarDivider} />
          <Text style={styles.sidebarSectionTitle}>Enlaces profesionales</Text>
          {hasValue(links.github) ? <Text style={styles.sidebarLink}>GitHub: {links.github}</Text> : null}
          {hasValue(links.linkedin) ? (
            <Text style={styles.sidebarLink}>LinkedIn: {links.linkedin}</Text>
          ) : null}
          {hasValue(links.portfolio) ? (
            <Text style={styles.sidebarLink}>Portafolio: {links.portfolio}</Text>
          ) : null}
        </>
      ) : null}
    </View>
  )
}

function SkillItem({ skill }) {
  const level = Math.min(100, Math.max(0, Number(skill.level) || 0))

  return (
    <View style={styles.skillItem} wrap={false}>
      <View style={styles.skillHeader}>
        <Text style={styles.skillName}>{skill.name}</Text>
        {level > 0 ? <Text style={styles.skillLevel}>{level}/100</Text> : null}
      </View>
      {hasValue(skill.category) ? (
        <Text style={styles.skillCategory}>{skill.category}</Text>
      ) : null}
      {level > 0 ? (
        <View style={styles.skillBar}>
          <View style={[styles.skillBarFill, { width: `${level}%` }]} />
        </View>
      ) : null}
    </View>
  )
}

function ProjectItem({ project }) {
  return (
    <View style={styles.card}>
      <View style={styles.projectRow}>
        {hasValue(project.imageUrl) ? (
          <Image style={styles.projectImage} src={project.imageUrl} />
        ) : null}
        <View style={styles.projectContent}>
          <Text style={styles.itemTitle}>{project.name}</Text>
          {hasValue(project.technologies) ? (
            <Text style={styles.itemTag}>{project.technologies}</Text>
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
      </View>
    </View>
  )
}

function EducationItem({ educationItem }) {
  const program = educationItem.program || educationItem.degree

  return (
    <View style={styles.card}>
      <View style={styles.educationRow}>
        {hasValue(educationItem.period) ? (
          <View style={styles.periodBlock}>
            <Text style={styles.periodText}>{educationItem.period}</Text>
          </View>
        ) : null}
        <View style={styles.educationContent}>
          <Text style={styles.itemTitle}>{program}</Text>
          {hasValue(educationItem.institution) ? (
            <Text style={styles.itemTag}>{educationItem.institution}</Text>
          ) : null}
          {hasValue(educationItem.description) ? (
            <Text style={styles.paragraph}>{educationItem.description}</Text>
          ) : null}
          {hasValue(educationItem.evidenceUrl) ? (
            <Text style={styles.linkText}>Evidencia: {educationItem.evidenceUrl}</Text>
          ) : null}
        </View>
      </View>
    </View>
  )
}

function LanguageItem({ language }) {
  return (
    <View style={[styles.card, styles.languageCard]} wrap={false}>
      <Text style={styles.languageBadge}>{language.level || 'Nivel'}</Text>
      <View style={styles.projectContent}>
        <Text style={styles.itemTitle}>{language.name}</Text>
        {hasValue(language.description) ? (
          <Text style={styles.paragraph}>{language.description}</Text>
        ) : null}
      </View>
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
  const [leftSkills, rightSkills] = splitByColumn(skills)

  return (
    <Document title="DevProfile CV" author={personal.name || 'DevProfile'}>
      <Page size="A4" style={styles.page} wrap>
        <Sidebar personal={personal} links={links} />

        <View style={styles.content}>
          {hasValue(personal.description) ? (
            <Section title="Perfil profesional" icon="P">
              <Text style={styles.paragraph}>{personal.description}</Text>
            </Section>
          ) : null}

          {skills.length > 0 ? (
            <Section title="Habilidades" icon="H">
              <View style={styles.twoColumns}>
                <View style={styles.column}>
                  {leftSkills.map((skill) => (
                    <SkillItem key={skill.id} skill={skill} />
                  ))}
                </View>
                <View style={styles.column}>
                  {rightSkills.map((skill) => (
                    <SkillItem key={skill.id} skill={skill} />
                  ))}
                </View>
              </View>
            </Section>
          ) : null}

          {projects.length > 0 ? (
            <Section title="Proyectos" icon="B">
              {projects.map((project) => (
                <ProjectItem key={project.id} project={project} />
              ))}
            </Section>
          ) : null}

          {education.length > 0 ? (
            <Section title="Educación, cursos y certificaciones" icon="E">
              {education.map((educationItem) => (
                <EducationItem key={educationItem.id} educationItem={educationItem} />
              ))}
            </Section>
          ) : null}

          {languages.length > 0 ? (
            <Section title="Idiomas" icon="I">
              {languages.map((language) => (
                <LanguageItem key={language.id} language={language} />
              ))}
            </Section>
          ) : null}
        </View>

        <Text style={styles.footer} fixed>
          <Text style={styles.quoteMark}>“ </Text>
          La disciplina es el puente entre metas y logros.
          <Text style={styles.quoteMark}> ”</Text>
        </Text>
      </Page>
    </Document>
  )
}

export default PDFDocument
