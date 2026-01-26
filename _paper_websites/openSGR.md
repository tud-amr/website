---
title: "OpenSGR: Efficient 3D Scene Graph Registration in the Open World"
authors:
  - name: "Gang (Clarence) Chen"
    url: "https://g-ch.github.io/"
    superscript: "1"
  - name: "Sebastian Barbas Laina"
    # url: "https://www.cs.cmu.edu/~abajcsy/"
    superscript: "2"
  - name: "Stefan Leutenegger"
    # url: "https://www.cs.cmu.edu/~abajcsy/"
    superscript: "2,3"
  - name: "Javier Alonso-Mora"
    url: "https://www.autonomousrobots.nl/"
    superscript: "1"
affiliations:
  - name: "TU Delft"
    superscript: "1"
    url: "https://tudelft.nl"
  - name: "TU Munich"
    superscript: "2"
  - name: "ETH Zurich"
    superscript: "3"
    # url: "https://www.cs.cmu.edu/"
release_date: 2025-01-010 # publication or relevant date, approximated if not sure. Just for display purposes and ordering.
links: # If you have other website for the project, github repos, datasets, etc. put it here. You can also add an icon from https://icons.getbootstrap.com/
  - name: Paper (coming soon)
    icon: bi-file-earmark-pdf
    # url: "https://arxiv.org/abs/..."
  # - name: Code
  #   icon: bi-github
  #   url: "https://github.com/..."
  # - name: Video
  #   icon: bi-youtube
  #   url: "https://www.youtube.com/watch?v=..."
  - name: Related Publications
    icon: bi-file-text
    url: "#related-publications"
related_project_id: "saraypapers"
hidden: true # Only accessible via direct link, not listed or indexed
sitemap: false # Exclude from sitemap
---

<style>
    ol.figure-list {
        list-style-type: none;
        counter-reset: list-counter;
        padding-left: 10px;
    }
    ol.figure-list li::before {
        counter-increment: list-counter;
        content: "(" counter(list-counter, lower-alpha) ")";
        padding-right: 8px;
    }
</style>

<hr/>
<h2 align="center"><u>Overview</u></h2>
<div class="row">
  <div class="col-12">
    <img src="{% include fix_link.html link='/assets/images/papers/opensgr/cover_image.png' %}" width="100%">
  </div>
</div>

<p align="justify">
  In this work, we first propose a data annotation pipeline that can generate open-set 3D scene graphs from RGB-D images and poses by combining several foundation models with point cloud processing tools. We apply this pipeline to ScanNet, which contains more than 1,500 scans of 807 scenes, and build a dataset that supports both F2S and S2S alignment tasks. Each object node is associated with rich attributes, including semantic labels, BERT embeddings, VLM embeddings, object point clouds, and 3D bounding boxes. Then efficient scene graph alignment framework that fuses VLM, BERT, and 3D bounding box features of each object with its spatial context is proposed to predict correspondences between two graphs. Specifically, we introduce a robust correspondence prediction network that incorporates a distance-gated spatial attention encoder for context fusion, a matcher with both lightweight and high-performance variants for correspondence score matrix prediction, and a minimum-cost-flow-based many-to-one allocator for globally consistent matching. In Figures above, a result of our high-performance version model to illustrate the dataset and tasks. Below we show a flow chart of our method.
</p>

<div class="row">
  <div class="col-12">
    <img src="{% include fix_link.html link='/assets/images/papers/opensgr/method.png' %}" width="100%">
  </div>
</div>

<p align="justify">
  Our main **contributions** include:
</p>
<p align="justify">
  (1) A unified framework for efficient scene graph alignment: We introduce an end-to-end alignment framework that performs node matching and submap-level matching, enabling robust alignment across partial and cross-view observations.  We release both lightweight and high-performance versions to support different efficiency--accuracy trade-offs.
</p>
<p align="justify">
  (2) Robust scene graph alignment network: We propose a distance-gated spatial attention encoder that encodes node context even under large coordinate discrepancies, together with a minimum-cost-flow-based many-to-one allocator for efficient and globally consistent matching.
</p>
<p align="justify">
  (3) A scalable annotation pipeline and a large-scale dataset: We develop an automated annotation pipeline and construct ScanNet-SG, a dataset that supports both F2S and S2S alignment tasks. ScanNet-SG covers over 500 and 3k object classes (in different groups) and provides more than 700k samples in total.
</p>


<hr/>
<h2 align="center"><u>Dataset</u></h2>
<div class="row">
  <div class="col-12">
    <img src="{% include fix_link.html link='/assets/images/papers/opensgr/dataset1.png' %}" width="100%">
  </div>
</div>

<p align="justify">
  We build 3D scene graphs for the ScanNet dataset with object tags given by ScanNet human annotations and ChatGPT4o, respectively, in two groups. Blue lines show the edges connected by a distance threshold (< 2m). The image above shows scene graphs of six scenes built using tags from human annotations. Below we present another three scene graphs built using tags from ChatGPT4o. Object classes are much richer in the group using ChatGPT4o but could contain errors. We annotate 806 scenes in total using human annotated tags and 110 scenes in total using ChatGPT4o annotated tags.
</p>

<div class="row">
  <div class="col-12">
    <img src="{% include fix_link.html link='/assets/images/papers/opensgr/dataset2.png' %}" width="100%">
  </div>
</div>


<hr/>
<h2 align="center"><u>Results</u></h2>

<p align="justify">
  We present some qualitative results in the following. These results show that our method achieves the best performance in both F2S and S2S tasks. More quantitative results can be found in the paper.
</p>

<div class="row">
  <div class="col-12">
    <img src="{% include fix_link.html link='/assets/images/papers/opensgr/results_cross5.png' %}" width="100%">
  </div>
</div>
<p align="justify">
  Visualization of matching results produced by different models (A–E). In each subplot, the central point cloud corresponds to the full scan of Scene0673_00. The query frames are sampled from a separate scan of the same scene, Scene0673_01 (cross-scan), and are shown in the top-left as instance-segmented RGB images labeled 1–7, corresponding to ScanNet frame IDs 15, 105, 252, 639, 1050, 1521, and 1830. Objects are visualized with distinct colors, and each object center is marked with a blue dot (unmatched) or a red dot (matched). Correct correspondences are indicated by green lines, while incorrect correspondences are shown in red. Orange lines denote the ground-truth corrected correspondences for either incorrect matches or missed matches. For visualization purposes, each frame point cloud (originally in its camera coordinate system) is transformed into the world coordinate system of Scene0673_00 and then translated to a nearby location around the scan point cloud. This transformation is applied only for visualization and is not provided to any of the matching models.
</p>
<div class="row">
  <div class="col-12">
    <img src="{% include fix_link.html link='/assets/images/papers/opensgr/s2s_results.png' %}" width="100%">
  </div>
</div>
<p align="justify">
  Comparison of different methods on the S2S alignment task. The subscan pairs in (A–D) are: (A) Scene0673_00 frames 1383–2139 and Scene0673_01 frames 1584–1989; (B) Scene0673_00 frames 654–1140 and Scene0673_02 frames 234–1032; (C) Scene0603_00 frames 315–753 and Scene0603_01 frames 690–1317; and (D) Scene0642_00 frames 168–777 and Scene0642_01 frames 1890–2367. The overlap ratio between the two subscans decreases from 0.926 to 0.142.
</p>

