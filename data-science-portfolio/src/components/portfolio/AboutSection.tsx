import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  BarChart3, 
  Globe, 
  Database, 
  Brain, 
  Zap,
  GraduationCap,
  Award,
  TrendingUp
} from 'lucide-react';

const AboutSection = () => {
  const skills = {
    'Programming Languages': {
      icon: <Code className="h-5 w-5" />,
      items: ['Python', 'JavaScript/TypeScript', 'R', 'SQL', 'Java', 'Go']
    },
    'Data Science & ML': {
      icon: <Brain className="h-5 w-5" />,
      items: ['Scikit-learn', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Statistical Analysis']
    },
    'Web Technologies': {
      icon: <Globe className="h-5 w-5" />,
      items: ['React', 'Next.js', 'Node.js', 'FastAPI', 'Flask', 'Docker']
    },
    'Data Visualization': {
      icon: <BarChart3 className="h-5 w-5" />,
      items: ['D3.js', 'Plotly', 'Matplotlib', 'Seaborn', 'Tableau', 'Power BI']
    },
    'Databases & Cloud': {
      icon: <Database className="h-5 w-5" />,
      items: ['PostgreSQL', 'MongoDB', 'AWS', 'GCP', 'Redis', 'Elasticsearch']
    },
    'MLOps & Deployment': {
      icon: <Zap className="h-5 w-5" />,
      items: ['MLflow', 'Kubernetes', 'CI/CD', 'Monitoring', 'A/B Testing', 'Model Serving']
    }
  };

  const achievements = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: 'M.S. Data Science',
      subtitle: 'Stanford University',
      description: 'Specialized in Machine Learning and Statistical Modeling'
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: 'AWS Certified',
      subtitle: 'Machine Learning Specialty',
      description: 'Advanced cloud ML infrastructure and deployment'
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: '5+ Years Experience',
      subtitle: 'Fullstack Development',
      description: 'Building scalable web applications and APIs'
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

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                From Code to Insights, From Insights to Impact
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                My journey began in fullstack web development, where I spent over 5 years building 
                scalable applications and user experiences. This foundation in software engineering 
                has proven invaluable as I transitioned into data science, giving me a unique 
                perspective that most data scientists lack.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                While many data scientists excel at analysis but struggle with deployment, 
                I bridge that gap by creating production-ready applications that make complex 
                data insights accessible to real users. I don't just build models—I build 
                complete solutions that solve business problems.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                My approach combines rigorous statistical analysis with intuitive user 
                interfaces, ensuring that data-driven insights actually drive decision-making 
                rather than sitting in notebooks. Every project showcases this full-stack 
                data science philosophy.
              </p>

              <div className="pt-4">
                <h4 className="text-lg font-semibold text-foreground mb-4">
                  Key Differentiators
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    End-to-end project delivery from data exploration to production deployment
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Interactive dashboards and web applications for complex data insights
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    MLOps expertise for scalable model deployment and monitoring
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Business-focused solutions that translate technical insights into actionable strategies
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Education & Achievements
              </h3>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {achievement.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {achievement.title}
                          </h4>
                          <p className="text-primary font-medium">
                            {achievement.subtitle}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 p-6 bg-card rounded-lg border">
                <h4 className="text-lg font-semibold text-foreground mb-3">
                  Continuous Learning
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  I maintain active certifications and contribute to open-source projects. 
                  Currently exploring cutting-edge areas like Large Language Models, 
                  MLOps automation, and real-time analytics platforms.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
              Technical Expertise
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(skills).map(([category, { icon, items }]) => (
                <Card key={category} className="p-6 hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {icon}
                      </div>
                      <h4 className="font-semibold text-foreground">
                        {category}
                      </h4>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;