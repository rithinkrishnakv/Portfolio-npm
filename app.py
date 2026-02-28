from flask import Flask, render_template, url_for

app = Flask(
    __name__,
    template_folder="templates",
    static_folder="static"
)

@app.route("/")
def home():
    return about()

@app.route('/about')
def about():
    """Landing page - Rithin Krishna K V"""
    experience = [
        {
            'role': 'Cyber Security Trainee (ADCD)',
            'company': 'RedTeam Hacker Academy',
            'duration': 'Aug 2025 - Present',
            'description': 'Undergoing intensive training in Advanced Diploma in Cyber Defence. Focusing on Network Security, Linux Essentials, and Ethical Hacking methodologies.'
        },
        {
            'role': 'Security Researcher (Self-Directed)',
            'company': 'TryHackMe / HackTheBox',
            'duration': '2025 - Present',
            'description': 'Maintaining a consistent learning streak (90+ days) on TryHackMe, solving rooms related to Web Vulnerabilities, Privilege Escalation, and SOC Analyst paths.'
        }
    ]
    return render_template('about.html', active_page='about', experience=experience)

@app.route('/projects')
def projects():
    """Rithin's Projects & Lab Write-ups"""
    projects_data = [
        {
            'title': 'TryHackMe Streak',
            'description': 'Consistent daily practice in offensive and defensive security scenarios. Completed various pathways including Pre-Security and Web Fundamentals.',
            'tech': ['Linux', 'Networking', 'Web Security', 'Burp Suite'],
            'github': 'https://tryhackme.com/p/Rithinkrishna',
            'category': 'Cyber Security'
        },
        {
            'title': 'Personal Portfolio Infrastructure',
            'description': 'Automated deployment of a Flask-based portfolio using GitHub Actions and Vercel for professional branding.',
            'tech': ['Python', 'Flask', 'Vercel', 'CI/CD'],
            'github': 'https://github.com/rithinkrishnakv/Portfolio-npm',
            'category': 'DevOps'
        }
    ]
    return render_template('projects.html', active_page='projects', projects=projects_data)

@app.route('/academics')
def academics():
    """Education - Rithin Krishna K V"""
    education_data = [
        {
            'degree': 'Advanced Diploma in Cyber Defence (ADCD)',
            'specialization': 'Cyber Security & Ethical Hacking',
            'institution': 'RedTeam Hacker Academy',
            'duration': 'Aug 2025 - Present',
            'coursework': [
                'Linux for Hackers',
                'Computer Networking',
                'Ethical Hacking Fundamentals',
                'Web Application Penetration Testing',
                'Digital Forensics'
            ]
        },
        {
            'degree': 'Higher Secondary Education (+2)',
            'specialization': 'Science/Computer Science',
            'institution': 'Completed 2025',
            'duration': '2023 - 2025',
            'coursework': ['Computer Science', 'Mathematics', 'Physics']
        }
    ]
    
    skills_data = {
        'Security Skills': ['Vulnerability Assessment', 'Network Reconnaissance', 'OWASP Top 10', 'Linux Security'],
        'Tools & Platforms': ['TryHackMe', 'Kali Linux', 'Nmap', 'Metasploit', 'Burp Suite', 'Wireshark'],
        'Programming': ['Python (Basic)', 'HTML/CSS', 'Bash Scripting'],
        'Soft Skills': ['Persistence (90-day streak)', 'Technical Writing', 'Problem Solving']
    }
    return render_template('academics.html', active_page='academics', education=education_data, skills=skills_data)

@app.route('/research')
def research():
    """Research & Medium Publications"""
    publications = [
        {
            'title': 'My Security Journey',
            'description': 'Sharing insights and write-ups from my learning path at RedTeam Hacker Academy.',
            'platform': 'Medium',
            'url': 'https://medium.com/@rithinkrishnakv'
        }
    ]
    return render_template('research.html', active_page='research', research_projects=[], publications=publications)

@app.route('/contact')
def contact():
    """Contact Info"""
    contact_info = {
        'email': 'rithinkrishnakv@gmail.com',
        'linkedin': 'https://www.linkedin.com/in/rithin-krishna-k-v-15593b381/',
        'github': 'https://github.com/rithinkrishnakv',
        'tryhackme': 'https://tryhackme.com/p/Rithinkrishna'
    }
    return render_template('contact.html', active_page='contact', contact_info=contact_info)

if __name__ == '__main__':
    app.run(debug=True)
