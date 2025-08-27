import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Github, 
  ExternalLink, 
  Play,
  Database,
  Brain,
  Target,
  Zap
} from 'lucide-react';

// Import chart components
import ChurnRiskChart from '@/components/charts/ChurnRiskChart';
import RealEstateChart from '@/components/charts/RealEstateChart';
import ABTestChart from '@/components/charts/ABTestChart';
import SalesForecastChart from '@/components/charts/SalesForecastChart';

const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState('churn');

  const projects = [
    {
      id: 'churn',
      title: 'Customer Churn Prediction Dashboard',
      subtitle: 'End-to-End ML Web Application',
      description: 'Full-stack application with React frontend, Python/Flask backend, and deployed ML model for predicting customer churn in real-time.',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-blue-500',
      technologies: ['Python', 'React', 'Flask', 'Scikit-learn', 'PostgreSQL', 'Docker', 'AWS'],
      metrics: [
        { label: 'Model Accuracy', value: '89%' },
        { label: 'Precision', value: '85%' },
        { label: 'Users Served', value: '1.2K+' },
        { label: 'Cost Savings', value: '$2.3M' }
      ],
      highlights: [
        'Real-time churn prediction API with 200ms response time',
        'Interactive dashboard with drill-down capabilities',
        'Automated model retraining pipeline',
        'A/B tested feature importance explanations'
      ],
      businessImpact: 'Reduced customer acquisition costs by 35% and improved retention rates by 22% through proactive intervention strategies.',
      component: <ChurnRiskChart />
    },
    {
      id: 'realestate',
      title: 'Real Estate Market Analysis Tool',
      subtitle: 'Interactive Data Visualization Platform',
      description: 'React-based dashboard with complex filtering and drill-down capabilities for comprehensive real estate market analysis.',
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'bg-green-500',
      technologies: ['React', 'D3.js', 'TypeScript', 'Node.js', 'MongoDB', 'Mapbox', 'Recharts'],
      metrics: [
        { label: 'Properties Analyzed', value: '50K+' },
        { label: 'Markets Covered', value: '25' },
        { label: 'Daily Users', value: '450' },
        { label: 'Accuracy', value: '94%' }
      ],
      highlights: [
        'Interactive geographic visualization with custom map layers',
        'Advanced filtering with 15+ property and market parameters',
        'Predictive pricing model with confidence intervals',
        'Responsive design optimized for mobile and desktop'
      ],
      businessImpact: 'Enabled real estate professionals to make data-driven decisions 40% faster, with 15% improvement in pricing accuracy.',
      component: <RealEstateChart />
    },
    {
      id: 'abtest',
      title: 'A/B Testing Framework and Analysis',
      subtitle: 'Statistical Analysis Deep Dive',
      description: 'Comprehensive statistical analysis project with web-based results presentation and automated experiment monitoring.',
      icon: <Target className="h-6 w-6" />,
      color: 'bg-purple-500',
      technologies: ['Python', 'R', 'Streamlit', 'Plotly', 'SciPy', 'PostgreSQL', 'Docker'],
      metrics: [
        { label: 'Tests Analyzed', value: '127' },
        { label: 'Statistical Power', value: '0.8+' },
        { label: 'Type I Error', value: '<5%' },
        { label: 'Business Impact', value: '+25%' }
      ],
      highlights: [
        'Automated statistical significance testing with multiple correction',
        'Bayesian and frequentist analysis comparison',
        'Interactive power analysis and sample size calculator',
        'Automated alert system for significant results'
      ],
      businessImpact: 'Established rigorous testing framework that increased conversion rates by 25% and prevented 12 false positive deployments.',
      component: <ABTestChart />
    },
    {
      id: 'forecast',
      title: 'Sales Forecasting Dashboard',
      subtitle: 'Time Series Forecasting Application',
      description: 'Predictive modeling with interactive forecast exploration, automated retraining, and business intelligence integration.',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'bg-orange-500',
      technologies: ['Python', 'Prophet', 'LSTM', 'React', 'FastAPI', 'Redis', 'Kubernetes'],
      metrics: [
        { label: 'MAPE', value: '8.5%' },
        { label: 'R²', value: '0.94' },
        { label: 'Forecasts Generated', value: '2.1M' },
        { label: 'Revenue Impact', value: '+$4.2M' }
      ],
      highlights: [
        'Ensemble forecasting with Prophet, ARIMA, and LSTM models',
        'Real-time anomaly detection and alerting system',
        'Multi-seasonal decomposition with holiday effects',
        'Confidence interval visualization with uncertainty quantification'
      ],
      businessImpact: 'Improved inventory planning efficiency by 30% and reduced stockouts by 45% through accurate demand forecasting.',
      component: <SalesForecastChart />
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

  const currentProject = projects.find(p => p.id === activeProject);

  return (
    <section id="projects" className="py-20">
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
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive showcases that demonstrate the full data science pipeline, 
              from data exploration to production deployment and business impact.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Project Navigation */}
            <motion.div variants={itemVariants} className="lg:col-span-4">
              <div className="space-y-4">
                {projects.map((project) => (
                  <Card 
                    key={project.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      activeProject === project.id 
                        ? 'border-primary bg-primary/5 shadow-md' 
                        : 'hover:border-primary/30'
                    }`}
                    onClick={() => setActiveProject(project.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${project.color} text-white flex-shrink-0`}>
                          {project.icon}
                        </div>
                        <div className="flex-grow min-w-0">
                          <h3 className="font-semibold text-foreground text-lg leading-tight mb-2">
                            {project.title}
                          </h3>
                          <p className="text-primary text-sm font-medium mb-2">
                            {project.subtitle}
                          </p>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{project.technologies.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Project Details */}
            <motion.div variants={itemVariants} className="lg:col-span-8">
              {currentProject && (
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl mb-2">
                          {currentProject.title}
                        </CardTitle>
                        <p className="text-muted-foreground">
                          {currentProject.description}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {currentProject.metrics.map((metric, index) => (
                        <Card key={index} className="text-center">
                          <CardContent className="p-4">
                            <div className="text-2xl font-bold text-primary mb-1">
                              {metric.value}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {metric.label}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Interactive Component */}
                    <Tabs defaultValue="visualization" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="visualization">Visualization</TabsTrigger>
                        <TabsTrigger value="highlights">Technical Highlights</TabsTrigger>
                        <TabsTrigger value="impact">Business Impact</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="visualization" className="space-y-4">
                        <div className="min-h-[400px]">
                          {currentProject.component}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="highlights" className="space-y-4">
                        <Card>
                          <CardContent className="p-6">
                            <h4 className="font-semibold text-foreground mb-4">
                              Key Technical Achievements
                            </h4>
                            <ul className="space-y-3">
                              {currentProject.highlights.map((highlight, index) => (
                                <li key={index} className="flex items-start">
                                  <Zap className="h-4 w-4 text-primary mt-0.5 mr-3 flex-shrink-0" />
                                  <span className="text-muted-foreground">{highlight}</span>
                                </li>
                              ))}
                            </ul>
                            
                            <div className="mt-6">
                              <h5 className="font-medium text-foreground mb-3">
                                Technology Stack
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {currentProject.technologies.map((tech) => (
                                  <Badge key={tech} variant="secondary">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="impact" className="space-y-4">
                        <Card className="border-primary/20 bg-primary/5">
                          <CardContent className="p-6">
                            <div className="flex items-start space-x-3">
                              <DollarSign className="h-6 w-6 text-primary mt-1" />
                              <div>
                                <h4 className="font-semibold text-foreground mb-2">
                                  Business Impact & Results
                                </h4>
                                <p className="text-muted-foreground leading-relaxed">
                                  {currentProject.businessImpact}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Ready to Transform Your Data Into Solutions?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Let's discuss how these proven methodologies can be applied to your specific challenges. 
                  I specialize in bridging the gap between data insights and production applications.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="group">
                    <Play className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    Schedule a Demo
                  </Button>
                  <Button variant="outline" size="lg">
                    <Database className="mr-2 h-4 w-4" />
                    View All Projects
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;