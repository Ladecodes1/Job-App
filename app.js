document.addEventListener('DOMContentLoaded', function() {
    const jobList = document.getElementById('job-list');
    const loading = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');
    const searchBtn = document.getElementById('search-btn');
    
    // DOM elements for filters
    const roleFilter = document.getElementById('role-filter');
    const companyFilter = document.getElementById('company-filter');
    const locationFilter = document.getElementById('location-filter');
    
    let jobsData = [];
    
    // Fetch jobs from API
    async function fetchJobs() {
        try {
            // Show loading state
            loading.style.display = 'flex';
            jobList.innerHTML = '';
            errorMessage.style.display = 'none';
            
            const response = await fetch('https://www.arbeitnow.com/api/job-board-api');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            jobsData = data.data || [];
            
            displayJobs(jobsData);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            showError('Failed to load jobs. Please try again later.');
        } finally {
            loading.style.display = 'none';
        }
    }
    
    // Display jobs in the UI
    function displayJobs(jobs) {
        jobList.innerHTML = '';
        
        if (jobs.length === 0) {
            jobList.innerHTML = '<p class="no-jobs">No jobs found matching your criteria.</p>';
            return;
        }
        
        jobs.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.className = 'job-card';
            
            // Format description to remove HTML tags and limit length
            let description = job.description || 'No description provided';
            description = description.replace(/<[^>]*>/g, '').substring(0, 200) + '...';
            
            // Format date
            const postedDate = new Date(job.created_at).toLocaleDateString();
            
            jobCard.innerHTML = `
                <div class="job-card-header">
                    <h3 class="job-title">${job.title}</h3>
                    <p class="job-company">${job.company_name}</p>
                    <p class="job-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${job.location}
                    </p>
                </div>
                <div class="job-card-body">
                    <span class="job-type">${job.remote ? 'Remote' : 'On-site'}</span>
                    <p class="job-description">${description}</p>
                </div>
                <div class="job-card-footer">
                    <a href="${job.url}" target="_blank" class="apply-btn">View Job</a>
                </div>
            `;
            
            jobList.appendChild(jobCard);
        });
    }
    
    // Filter jobs based on user input
    function filterJobs() {
        const roleValue = roleFilter.value.toLowerCase();
        const companyValue = companyFilter.value.toLowerCase();
        const locationValue = locationFilter.value.toLowerCase();
        
        const filteredJobs = jobsData.filter(job => {
            const titleMatch = job.title.toLowerCase().includes(roleValue);
            const companyMatch = job.company_name.toLowerCase().includes(companyValue);
            const locationMatch = job.location.toLowerCase().includes(locationValue);
            
            return titleMatch && companyMatch && locationMatch;
        });
        
        displayJobs(filteredJobs);
    }
    
    // Show error message
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
    
    // Event listeners
    searchBtn.addEventListener('click', filterJobs);
    
    // Also filter when pressing Enter in any input field
    [roleFilter, companyFilter, locationFilter].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filterJobs();
            }
        });
    });
    
    // Initial load
    fetchJobs();
});/* Last updated by Naomi  on 2025-07-31 */
