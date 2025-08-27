import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  BarChart3, 
  Globe, 
  Database, 
  Brain, 
  Zap,
  Server,
  Cloud,
  Palette,
  Shield
} from 'lucide-react';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: <Code className="h-5 w-5" />,
      color: 'bg-blue-500',
      skills: [
        { name: 'Python', level: 95, projects: ['Churn Prediction', 'A/B Testing', 'Sales Forecasting'], yearsExp: 6 },
        { name: 'JavaScript/TypeScript', level: 90, projects: ['Real Estate Dashboard', 'Churn Dashboard'], yearsExp: 8 },
        { name: 'R', level: 85, projects: ['Statistical Analysis', 'A/B Testing'], yearsExp: 4 },
        { name: 'SQL', level: 88, projects: ['All Projects'], yearsExp: 7 },
        { name: 'Java', level: 75, projects: ['Enterprise ML Pipeline'], yearsExp: 3 },
        { name: 'Go', level: 70, projects: ['Microservices', 'API Gateway'], yearsExp: 2 }
      ]
    },
    {
      title: 'Data Science & ML',
      icon: <Brain className="h-5 w-5" />,
      color: 'bg-purple-500',
      skills: [
        { name: 'Scikit-learn', level: 92, projects: ['Churn Prediction', 'Real Estate Analysis'], yearsExp: 5 },
        { name: 'TensorFlow/Keras', level: 88, projects: ['Sales Forecasting', 'Deep Learning Models'], yearsExp: 4 },
        { name: 'PyTorch', level: 85, projects: ['Neural Networks', 'Computer Vision'], yearsExp: 3 },
        { name: 'Pandas/NumPy', level: 95, projects: ['All Projects'], yearsExp: 6 },
        { name: 'Statistical Analysis', level: 90, projects: ['A/B Testing', 'Forecasting'], yearsExp: 5 },
        { name: 'Time Series Analysis', level: 87, projects: ['Sales Forecasting'], yearsExp: 4 }
      ]
    },
    {
      title: 'Web Technologies',
      icon: <Globe className="h-5 w-5" />,
      color: 'bg-green-500',
      skills: [
        { name: 'React/Next.js', level: 93, projects: ['All Dashboards'], yearsExp: 5 },
        { name: 'Node.js', level: 88, projects: ['Backend APIs', 'Real-time Systems'], yearsExp: 6 },
        { name: 'FastAPI/Flask', level: 90, projects: ['ML APIs', 'Churn Service'], yearsExp: 4 },
        { name: 'RESTful APIs', level: 92, projects: ['All Projects'], yearsExp: 7 },
        { name: 'GraphQL', level: 80, projects: ['Data Federation'], yearsExp: 2 },
        { name: 'WebSockets', level: 85, projects: ['Real-time Analytics'], yearsExp: 3 }
      ]
    },
    {
      title: 'Data Visualization',
      icon: <BarChart3 className="h-5 w-5" />,
      color: 'bg-orange-500',
      skills: [
        { name: 'D3.js', level: 88, projects: ['Interactive Dashboards'], yearsExp: 4 },
        { name: 'Plotly/Dash', level: 90, projects: ['Statistical Visualizations'], yearsExp: 4 },
        { name: 'Matplotlib/Seaborn', level: 92, projects: ['Data Analysis'], yearsExp: 5 },
        { name: 'Tableau', level: 85, projects: ['Business Intelligence'], yearsExp: 3 },
        { name: 'Recharts', level: 89, projects: ['React Dashboards'], yearsExp: 3 },
        { name: 'Observable', level: 80, projects: ['Data Stories'], yearsExp: 2 }
      ]
    },
    {
      title: 'Databases & Storage',
      icon: <Database className="h-5 w-5" />,
      color: 'bg-red-500',
      skills: [
        { name: 'PostgreSQL', level: 90, projects: ['Production Systems'], yearsExp: 6 },
        { name: 'MongoDB', level: 85, projects: ['Document Storage'], yearsExp: 4 },
        { name: 'Redis', level: 88, projects: ['Caching', 'Sessions'], yearsExp: 4 },
        { name: 'Elasticsearch', level: 82, projects: ['Search & Analytics'], yearsExp: 3 },
        { name: 'ClickHouse', level: 78, projects: ['Time Series Data'], yearsExp: 2 },
        { name: 'Apache Spark', level: 80, projects: ['Big Data Processing'], yearsExp: 3 }
      ]
    },
    {
      title: 'Cloud & DevOps',
      icon: <Cloud className="h-5 w-5" />,
      color: 'bg-cyan-500',
      skills: [
        { name: 'AWS', level: 87, projects: ['Production Deployments'], yearsExp: 4 },
        { name: 'Docker', level: 90, projects: ['Containerization'], yearsExp: 5 },
        { name: 'Kubernetes', level: 85, projects: ['Orchestration'], yearsExp: 3 },
        { name: 'CI/CD', level: 88, projects: ['Automation Pipelines'], yearsExp: 4 },
        { name: 'Terraform', level: 80, projects: ['Infrastructure as Code'], yearsExp: 2 },
        { name: 'Monitoring', level: 85, projects: ['Production Systems'], yearsExp: 4 }
      ]
    }
  ];

  const certifications = [
    {
      name: 'AWS Certified Machine Learning - Specialty',
      issuer: 'Amazon Web Services',
      year: '2023',
      icon: <Cloud className="h-4 w-4" />
    },
    {
      name: 'Google Professional Data Engineer',
      issuer: 'Google Cloud',
      year: '2023',
      icon: <Database className="h-4 w-4" />
    },
    {
      name: 'Deep Learning Specialization',
      issuer: 'Coursera/Stanford',
      year: '2022',
      icon: <Brain className="h-4 w-4" />
    },
    {
      name: 'React Developer Certification',
      issuer: 'Meta',
      year: '2022',
      icon: <Globe className="h-4 w-4" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const getSkillLevelColor = (level: number) => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 80) return 'bg-blue-500';
    if (level >= 70) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const getSkillLevelText = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Technical Skills Matrix
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A comprehensive overview of my technical expertise across the full data science 
              and web development stack, with real project applications and years of experience.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div key={category.title} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${category.color} text-white`}>
                        {category.icon}
                      </div>
                      <span>{category.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{skill.name}</span>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant="secondary" 
                              className={`text-xs text-white ${getSkillLevelColor(skill.level)}`}
                            >
                              {getSkillLevelText(skill.level)}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {skill.yearsExp}y
                            </span>
                          </div>
                        </div>
                        <Progress 
                          value={skill.level} 
                          className="h-2"
                        />
                        <div className="text-xs text-muted-foreground">
                          Used in: {skill.projects.slice(0, 2).join(', ')}
                          {skill.projects.length > 2 && ` +${skill.projects.length - 2} more`}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Professional Certifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {cert.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-sm leading-tight mb-1">
                          {cert.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {cert.issuer}
                        </p>
                        <p className="text-xs text-primary font-medium">
                          {cert.year}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills Summary */}
          <motion.div variants={itemVariants} className="mt-16">
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">50+</div>
                    <div className="text-muted-foreground">Technologies Mastered</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">8</div>
                    <div className="text-muted-foreground">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">15+</div>
                    <div className="text-muted-foreground">Production Systems Built</div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Full-Stack Data Science Philosophy
                  </h3>
                  <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    My unique combination of data science expertise and full-stack development skills 
                    enables me to build complete solutions that bridge the gap between analysis and 
                    production deployment. I don't just create models—I create scalable, user-friendly 
                    applications that make complex insights accessible and actionable.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;