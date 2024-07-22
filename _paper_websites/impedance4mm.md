---
title: "Current-Based Impedance Control for Interacting with Mobile Manipulators"
authors:
    - name: "Jelmer de Wolde"
      #url: "https://andreumatoses.github.io/"
      superscript: "1"
    - name: "Luzia Knoedler"
      url: "https://scholar.google.com/citations?user=oQKJuLoAAAAJ&hl=en&oi=ao"
      superscript: "1"
    - name: "Gianluca Garofalo"
      url: "https://scholar.google.com/citations?user=oQKJuLoAAAAJ&hl=en&oi=ao"
      superscript: "2"
    - name: "Javier Alonso-Mora"
      # url: "https://andreumatoses.github.io/"
      superscript: "1"
affiliations:
    # - name: "Equal contribution"
    #   superscript: "*"
    - name: "TU Delft"
      superscript: "1"
      url: "https://tudelft.nl"

    - name: "ABB Corporate Research"
      superscript: "2"
    # - name: "Wien Opera House"
    #   superscript: "†"
release_date: 2024-03-18 # publication or relevant date, approximated if not sure. Just for display purposes and ordering.
links: # If you have other website for the project, github repos, datasets, etc. put it here. You can also add an icon from https://icons.getbootstrap.com/
    - name: arXiv
      icon: bi-file-earmark-pdf
      url: "https://arxiv.org/pdf/2403.13079"
    - name: Code
      icon: bi-github
      url: https://github.com/tud-amr/mobile-manipulator-compliance
    - name: Clearpath Blog
      url: https://clearpathrobotics.com/blog/2024/07/delft-university-of-technology-advances-compliance-behavior-with-dingo-o-mobile-manipulator/
---

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h3 align="center">Guidance Mode</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/impedance4mm/videos/guide_shortened.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Allows guiding the mobile manipulator around the workspace through interacting with the arm. The target is statically placed in the reference frame of the base.
    </p>
  </div>
  <div class="col">
    <h3 align="center">Tracking Mode (speed x2)</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/impedance4mm/videos/track_shortened.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    End-effector (green circle) tracks target (red dot) while being compliant with user interactions. The target is placed in the reference frame of the world.
    </p>
  </div>
</div>

<h2> Abstract </h2>
<p align="justify">
As robots shift from industrial to human-centered spaces, adopting mobile manipulators, which expand workspace capabilities, becomes crucial. In these settings, seamless interaction with humans necessitates compliant control. Two common methods for safe interaction, admittance, and impedancecontrol, require force or torque sensors, often absent in lowercost or lightweight robots. This paper presents an adaption of impedance control that can be used on current-controlled robots without the use of force or torque sensors and its application for compliant control of a mobile manipulator. A calibration method is designed that enables estimation of the actuators’ current/torque ratios and frictions, used by
the adapted impedance controller, and that can handle model errors. The calibration method and the performance of the designed controller are experimentally validated using the Kinova GEN3 Lite arm. Results show that the calibration method is consistent and that the designed controller for the arm is compliant while also being able to track targets with fivemillimeter precision when no interaction is present. Additionally, this paper presents two operational modes for interacting with the mobile manipulator: one for guiding the robot around the workspace through interacting with the arm and another for executing a tracking task, both maintaining compliance to external forces. These operational modes were tested in realworld experiments, affirming their practical applicability and effectiveness.
</p>

  <div class="image-grid text-center mb-2">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2">
      <div class="col">
        <img class="img-fluid object-fit-contain" src="{% include fix_link.html link='/assets/images/msc_projects/24_JelmerDeWolde_CompliantMobileManipulation/base_control_reduced.png' %}" alt="Image 1">
      </div>
      <div class="col">
        <img class="img-fluid object-fit-contain" src="{% include fix_link.html link='/assets/images/msc_projects/24_JelmerDeWolde_CompliantMobileManipulation/guidance_mode.png' %}" alt="Image 1">
      </div>
      <div class="col">
        <img class="img-fluid object-fit-contain" src="{% include fix_link.html link='/assets/images/msc_projects/24_JelmerDeWolde_CompliantMobileManipulation/tracking_mode.png' %}" alt="Image 1">
      </div>
    </div>
  </div>
