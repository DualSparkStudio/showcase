/**
 * DualSparkStudio 3D Background - Enhanced Visibility
 * Vanilla Three.js implementation
 */

console.log('🚀 Three.js background script loading...');

// Wait for DOM and Three.js to be ready
function initThreeBackground() {
  console.log('🌟 Initializing 3D background...');
  
  // Check if Three.js is loaded
  if (typeof THREE === 'undefined') {
    console.error('❌ Three.js not loaded!');
    return;
  }
  
  console.log('✅ Three.js is loaded:', THREE.REVISION);

  // Scene setup
  const scene = new THREE.Scene();
  
  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 30;  // Moved closer to see stars better

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0); // Transparent

  // Create container
  const container = document.createElement('div');
  container.id = 'three-background';
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  `;
  container.appendChild(renderer.domElement);
  document.body.insertBefore(container, document.body.firstChild);

  console.log('✅ Renderer and container created');

  // Create BRIGHT visible stars (200 white dots - 20% of original)
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 200;
  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    let x = (Math.random() - 0.5) * 100;
    let y = (Math.random() - 0.5) * 100;
    let z = (Math.random() - 0.5) * 60;
    
    // LARGE exclusion zone - push ALL stars to the sides
    // Much wider horizontal zone: -40 to 40, Large vertical zone: -10 to 50
    if (x > -40 && x < 40 && y > -10 && y < 50) {
      // Push stars far to the sides
      x = x < 0 ? x - 40 : x + 40;
    }
    
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Create circular texture for stars
  const starCanvas = document.createElement('canvas');
  starCanvas.width = 32;
  starCanvas.height = 32;
  const starCtx = starCanvas.getContext('2d');
  const starGradient = starCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
  starGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  starGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
  starGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  starCtx.fillStyle = starGradient;
  starCtx.fillRect(0, 0, 32, 32);
  const starTexture = new THREE.CanvasTexture(starCanvas);

  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 6.0,  // HUGE size
    transparent: true,
    opacity: 1.0,  // Full opacity
    sizeAttenuation: false,  // Don't shrink with distance
    map: starTexture,  // Use circular texture
    blending: THREE.AdditiveBlending
  });

  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  console.log('✅ Stars created:', starCount);

  // Create additional white particles (60 smaller stars - 20% of original)
  const particleGeometry = new THREE.BufferGeometry();
  const particleCount = 60;
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    let x = (Math.random() - 0.5) * 80;
    let y = (Math.random() - 0.5) * 80;
    let z = (Math.random() - 0.5) * 50;
    
    // LARGE exclusion zone - push ALL particles to the sides
    // Match stars: -35 to 35, Large vertical zone: -8 to 45
    if (x > -35 && x < 35 && y > -8 && y < 45) {
      // Push particles far to the sides
      x = x < 0 ? x - 35 : x + 35;
    }
    
    particlePositions[i * 3] = x;
    particlePositions[i * 3 + 1] = y;
    particlePositions[i * 3 + 2] = z;
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  // Create circular texture for smaller white particles
  const particleCanvas = document.createElement('canvas');
  particleCanvas.width = 32;
  particleCanvas.height = 32;
  const particleCtx = particleCanvas.getContext('2d');
  const particleGradient = particleCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
  particleGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  particleGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
  particleGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  particleCtx.fillStyle = particleGradient;
  particleCtx.fillRect(0, 0, 32, 32);
  const particleTexture = new THREE.CanvasTexture(particleCanvas);

  const particleMaterial = new THREE.PointsMaterial({
    color: 0xffffff,  // White color
    size: 4.0,  // Smaller than main stars
    transparent: true,
    opacity: 0.7,  // Slightly transparent
    blending: THREE.AdditiveBlending,
    sizeAttenuation: false,  // Don't shrink with distance
    map: particleTexture  // Use circular texture with glow
  });

  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  console.log('✅ Particles created:', particleCount);

  // Create shooting stars (2 - 20% of original)
  const shootingStars = [];
  for (let i = 0; i < 2; i++) {
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(6);
    
    linePositions[0] = (Math.random() - 0.5) * 100;
    linePositions[1] = (Math.random() - 0.5) * 100;
    linePositions[2] = (Math.random() - 0.5) * 100;
    linePositions[3] = linePositions[0];
    linePositions[4] = linePositions[1];
    linePositions[5] = linePositions[2];

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,  // White shooting stars
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });

    const line = new THREE.Line(lineGeometry, lineMaterial);
    line.userData = {
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        -Math.random() * 30 - 10,
        (Math.random() - 0.5) * 30
      ),
      lifetime: 0,
      delay: Math.random() * 5,
      active: false
    };

    shootingStars.push(line);
    scene.add(line);
  }

  console.log('✅ Shooting stars created:', shootingStars.length);

  // Animation loop
  const clock = new THREE.Clock();
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  function animate() {
    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();
    const delta = clock.getDelta();

    // Rotate stars slowly
    stars.rotation.y = elapsed * 0.02;
    stars.rotation.x = elapsed * 0.01;

    // Rotate and move particles
    particles.rotation.y = elapsed * 0.05;
    particles.rotation.x = Math.sin(elapsed * 0.3) * 0.3;

    // Move camera slightly with mouse
    camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // Animate shooting stars
    shootingStars.forEach((star) => {
      const data = star.userData;
      
      if (!data.active) {
        data.delay -= delta;
        if (data.delay <= 0) {
          data.active = true;
          data.lifetime = 0;
          star.material.opacity = 0;
          
          // Reset position
          const pos = star.geometry.attributes.position.array;
          pos[0] = (Math.random() - 0.5) * 100;
          pos[1] = Math.random() * 50 + 20;
          pos[2] = (Math.random() - 0.5) * 100;
          pos[3] = pos[0];
          pos[4] = pos[1];
          pos[5] = pos[2];
          star.geometry.attributes.position.needsUpdate = true;
        }
      } else {
        data.lifetime += delta;
        
        if (data.lifetime < 1.5) {
          const pos = star.geometry.attributes.position.array;
          
          // Move the trail
          pos[3] += data.velocity.x * delta;
          pos[4] += data.velocity.y * delta;
          pos[5] += data.velocity.z * delta;
          
          if (data.lifetime > 0.1) {
            pos[0] += data.velocity.x * delta * 0.9;
            pos[1] += data.velocity.y * delta * 0.9;
            pos[2] += data.velocity.z * delta * 0.9;
          }
          
          star.geometry.attributes.position.needsUpdate = true;
          star.material.opacity = Math.sin(data.lifetime * Math.PI / 1.5) * 0.9;
        } else {
          data.active = false;
          data.delay = Math.random() * 5 + 2;
          star.material.opacity = 0;
        }
      }
    });

    renderer.render(scene, camera);
  }

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Start animation
  animate();
  console.log('✅ Animation started!');
}

// Initialize when everything is ready
function tryInit() {
  if (typeof THREE !== 'undefined') {
    console.log('✅ Three.js loaded, initializing background...');
    initThreeBackground();
  } else {
    console.log('⏳ Waiting for Three.js...');
    setTimeout(tryInit, 100); // Try again in 100ms
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', tryInit);
} else {
  tryInit();
}
