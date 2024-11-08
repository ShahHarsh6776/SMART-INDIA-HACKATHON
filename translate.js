function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en'
    }, 'google_translate_element');
}

document.addEventListener('DOMContentLoaded', function() {
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(20px)';
    });

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + window.innerHeight;
        teamMembers.forEach(member => {
            const memberPosition = member.getBoundingClientRect().top + window.scrollY;
            if (scrollPosition > memberPosition) {
                member.style.opacity = '1';
                member.style.transform = 'translateY(0)';
                member.style.transition = 'opacity 0.6s, transform 0.6s';
            }
        });
    });
});