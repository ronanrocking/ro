document.addEventListener('DOMContentLoaded', () => {
    const galleryList = document.getElementById('gallery-list');

    if (window.innerWidth < 1024) {
        document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=1024, initial-scale=1.0, maximum-scale=1.0');
    }
    

    // Fetch the folder names from folders.json
    fetch('../../../Data/hello.json')
        .then(response => response.json())
        .then(folders => {
            folders.forEach(folder => {
                // Create a div for each folder
                const div = document.createElement('div');
                div.className = 'gallery';

                // Create the gallery title (clickable)
                const title = document.createElement('div');
                title.className = 'gallery-title';
                title.textContent = folder.replace(/-/g, ' '); // Converts "nature-walks" to "Nature Walks"
                title.addEventListener('click', () => toggleGallery(folder));

                // Create the gallery container for images (hidden by default)
                const imagesContainer = document.createElement('div');
                imagesContainer.className = 'gallery-images';
                imagesContainer.id = folder; // Use the folder name as the ID

                // Store images in memory (not in DOM initially)
                const images = fetchImages(folder);

                div.appendChild(title);
                div.appendChild(imagesContainer);
                galleryList.appendChild(div);

                // Function to toggle the gallery visibility (collapsible effect)
                function toggleGallery(folder) {
                    const imagesContainer = document.getElementById(folder);

                    if (imagesContainer.style.display === 'none' || !imagesContainer.hasChildNodes()) {
                        // Load images only if they haven't been added yet
                        images.forEach(img => {
                            imagesContainer.appendChild(img);
                        });
                        imagesContainer.style.display = 'block';  // Show gallery
                    } else {
                        // Remove all images when gallery is closed
                        imagesContainer.innerHTML = '';  // Clear gallery images
                        imagesContainer.style.display = 'none';  // Hide gallery
                    }
                }
            });
        })
        .catch(err => console.error('Error loading galleries:', err));

    // Function to fetch images from a folder (dummy example for demo purposes)
    function fetchImages(folder) {
        const imageElements = [];
        // Assuming you have a known pattern for images (1.jpg, 2.jpg, etc.)
        for (let i = 1; i <= 11; i++) {
            const img = document.createElement('img');
            img.src = `../../../Data/photography/${folder}/${i}.jpg`; // Folder path and image naming convention
            img.alt = `${folder} - Image ${i}`;
            img.classList.add('lazy-load');  // Add a class for lazy loading
            imageElements.push(img);
        }
        return imageElements;
    }
});
