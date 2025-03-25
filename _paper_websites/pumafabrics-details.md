---
title: "TamedPUMA: safe and stable imitation learning with geometric fabrics"
authors:
    - name: "Saray Bakker"
      # url: "https://andreumatoses.github.io/"
      superscript: "1"
    - name: "Rodrigo Pérez-Dattari"
      url: "https://rperezdattari.github.io/"
      superscript: "1"
    - name: "Cosimo Della Santina"
      url: "https://cosimodellasantina.eu/"
      superscript: "1"
    - name: "Wendelin Böhmer"
      url: "https://www.tudelft.nl/ewi/over-de-faculteit/afdelingen/software-technology/algorithmics/people/wendelin-boehmer"
      superscript: "2"
    - name: "Javier Alonso-Mora"
      url: "https://autonomousrobots.nl/people/"
      superscript: "1"
affiliations:
    # - name: "Equal contribution"
    #   superscript: "*"
    - name: "Mechanical Engineering,"
      superscript: "1"
      url: "https://tudelft.nl"
    - name: "Electrical Engineering, Mathematics & Computer Science, TU Delft"
      superscript: "2"
      url: "https://tudelft.nl"
release_date: 2024-11-01 # publication or relevant date, approximated if not sure. Just for display purposes and ordering.
links: # If you have other website for the project, github repos, datasets, etc. put it here. You can also add an icon from https://icons.getbootstrap.com/
    # - name: IEEE Xplore
    #   icon: bi-file-earmark-pdf
    #   url: "https://doi.org/10.1109/LRA.2024.3397083"
    - name: arXiv
      icon: bi-file-earmark-pdf
      url: "https://arxiv.org/abs/2503.17432"
    - name: Code
      icon: bi-github
      url: https://github.com/tud-amr/PumaFabrics
    - name: Video
      icon: bi-youtube
      url: "https://www.youtube.com/watch?v=iWR5PmLZZ7o"
    - name: Appendix
      icon: bi-file-text
      url: "https://github.com/tud-amr/pumafabrics/blob/main/assets/TamedPUMA_appendix.pdf"
    - name: Related Publications
      icon: bi-file-text
      url: "#related-publications"
related_project_id: "saraypapers"
---
<div>
{% if page.usemathjax %}
<script>
MathJax = {
  tex: {
    tags: 'ams',
    inlineMath: [['$', '$']],
    displayMath: [['$$', '$$']],
    packages: {'[+]': ['ams']}, 
    processEscapes: true,
    macros: {
      norm: ["\\left\\lVert #1 \\right\\rVert", 1],
      vec: "\\boldsymbol",
      qdot: "\\dot{\\q}",
      qddot: "\\ddot{\\q}",
      q: "\\vec{q}",
      h: "\\vec{h}",
      f: "\\vec{f}",
      fC: "\\f^{\\mathcal{C}}_{\\theta}",
    }
  // svg: {
  //   fontCache: 'global'
  //  }
  }
};        
</script>
    <script type="text/javascript" id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    {% endif %}
</div>


<h2>Supplementary theoretical details on TamedPUMA</h2>
<b>A PDF of these supplementary theoretical details can be found <a href="https://github.com/tud-amr/pumafabrics/blob/main/assets/TamedPUMA_appendix.pdf">HERE</a></b>.
<h3>Energization and Finsler energies</h3>
<div>
In fabrics<span class="citation" onclick="document.getElementById('ratliff2023fabrics').scrollIntoView();"><sup>[1]</sup></span>, the concept of energization is used to transform the system $\qddot = \h(\q, \qdot)$ into an energy-conserving system. 
To ensure path-consistency after energization, the system $\qddot = \h(\q, \qdot)$ is designed to be <em>Homogenous of Degree 2 (HD2)</em>
which holds if $\h(\q, \alpha\qdot) = \alpha^2 \h(\q, \qdot)$ for $\alpha\geq0$. An energized system that is HD2 follows the same path as the original system and differs only by an acceleration along the direction of motion. 
<br><br>
It is common to use a Finsler energy to energize the system, although any Lagrangian can be used. A Finsler energy extends the concept of kinetic energy by enabling the modeling of directionally dependence metric tensors, e.g. the Finsler energy is HD2 in the velocity<span class="citation" onclick="document.getElementById('ratliff2020optimization').scrollIntoView();"><sup>[2]</sup></span>. Finsler energies have the property that the Hamiltonian $\mathcal{H}_{\mathcal{L}_e}$ associated with the Finsler energy $\mathcal{L}_e$, is the Finsler energy itself.
An energized system that conserves a Finsler energy and is path consistent is called a <em>geometric fabric</em>. 
<br><br>
To transform the original system $\qddot = \h(\q, \qdot)$ into a geometric fabric, we find $\bar{\alpha}$ for which the system, $\qddot = energize_{\mathcal{H}_{\mathcal{L}_e}}[\h] = \h(\q, \qdot) + \bar{\alpha}\qdot$, conserves the Finsler energy $\mathcal{L}_e$. This <em>energization</em> is performed by setting the time-derivative of the Hamilonian to zero, 
<!-- $$
\begin{subequations} -->
    \begin{align}
    \dot{\mathcal{H}}_{\mathcal{L}_e} &= \qdot^{\top}[\vec{M}_{\mathcal{L}_e}\qddot + \vec{\xi}_{\mathcal{L}_e}] = 0,\\
    &= \qdot^{\top}[\vec{M}_{\mathcal{L}_e}(\h + \bar{\alpha}\qdot)+ \vec{\xi}_{\mathcal{L}_e}] = 0,\\
    \bar{\alpha} &= - \frac{\qdot^{\top}\left( \vec{M}_{\mathcal{L}_e} \h + \vec{\xi}_{\mathcal{L}_e}\right)}{\qdot^{\top}\bf{M}_{\mathcal{L}_e}\qdot},
\end{align}
<!-- \end{subequations}
$$ -->
where $\left(\vec{M}_{\mathcal{L}_e}\qddot + \vec{\xi}_{\mathcal{L}_e}\right)$ are the Euler-Lagrange equations of $\mathcal{L}_e$ with $\vec{M}_{\mathcal{L}_e} = \partial^2_{\qdot\qdot}\mathcal{L}_e$ and $\vec{\xi}_{\mathcal{L}_e} = \partial_{\qdot \q}\mathcal{L}_e \qdot - \partial_{\q} \mathcal{L}_e$<span class="citation" onclick="document.getElementById('ratliff2023fabrics').scrollIntoView();"><sup>[1]</sup></span>.
</div>
<h3 id=proof>Theoretical details on the Compatible Potential Method</h3>
<div>
In the following, a theoretical analysis is provided of the stability and convergence properties related to the Compatible Potential Method (CPM). Firstly, more details are provided regarding the stability and convergence proof for a navigation policy $\f = \fC$ with a compatible potential $\psi(\q)$ and the required assumptions. 
This is followed by <a href="#tamedpuma_illustration">an illustration</a> of TamedPUMA with its corresponding relationships between latent space, task spaces and configuration space.
<br><br>
The stability and convergence properties of the CPM are based on Theorem III.5 in Ratliff et al. (2023)<span class="citation" onclick="document.getElementById('ratliff2023fabrics').scrollIntoView();"><sup>[1]</sup></span>.
The Theorem reads as follows, where we correct for two typos, replacing $\mathcal{H}$ with $\mathcal{H}_{\mathcal{L}_e}$ and $\gamma \qdot $ with $\gamma$ in the original description, i.e.
\begin{equation} \label{eq: system_CPM}
\qddot = energize_{\mathcal{H}_{\mathcal{L}_e}}[\h+\f]+\gamma \qdot \ \ \ \ \text{is replaced by:} \ \ \ \ \qddot = energize_{\mathcal{H}}[\h+\f]+\gamma.
\end{equation}
<br><br>
<b>Theorem III.5 adapted from Ratliff et al. (2023)<span class="citation" onclick="document.getElementById('ratliff2023fabrics').scrollIntoView();"><sup>[1]</sup></span>:</b> <em>Let </em>energize$_{\mathcal{L}_e}[\h(\q, \qdot)]$ <em>be a fabric with generator $\h$ and Finsler energy $\mathcal{L}_e$, and let $\f(\q, \qdot)$ be a navigation policy with compatible potential $\psi(\q)$. Denote the total energy by $\mathcal{H}=\mathcal{L}_e+\psi$. The system 
<!-- \begin{subequations} \label{eq: qddot_theoremIII5} -->
\begin{align} \label{eq: qddot_theoremIII5}
    \qddot &= energize_{\mathcal{H}}[\h+\f] - \beta \qdot\\
    &= energize_{\mathcal{H}_{\mathcal{L}_e}}[\h+\f]+\gamma %= \h + \f + \bar{\alpha} + \gamma,
    \end{align}
<!-- \end{subequations}  -->
</em>
<em>with energy regulator,</em>
\begin{equation} \label{eq: gamma}
    \gamma(\q, \qdot) = - \left(\frac{\qdot \qdot^{\top}}{\qdot^{\top}M_{\mathcal{L}_e}\qdot}\right)\delta \psi - \beta \qdot,
\end{equation}
<em>converges to the zero set of $\f$ for $\beta>0$.</em>
<br><br>
The proof of Theorem III.5 consists of two parts: (1) Showing that the system in Eq. \eqref{eq: qddot_theoremIII5} is energy-decreasing and therefore it results in $\qdot \rightarrow \vec{0}$ and $\qddot \rightarrow \vec{0}$ as time goes to infinity.  
(2) Assuring that when the system converges, it converges to the zero set of the navigation policy $\f$. 
<br><br>
<b>Step 1: </b> To ensure that the damped system decreases in energy resulting in $\qdot = \vec{0}$ and $\qddot = \vec{0}$, we first analyze the energy-conservative system, $energize_{\mathcal{H}}[\h +\f]$. 
<br><br>
<b>Step 1a:</b>
Let's start with finding $\alpha$ for which the system $\qddot = energize_{\mathcal{H}}[\h+\f] = \h + \f + \alpha \qdot$  is energy-conservative, i.e. the derivative of the Hamiltonian is zero, $\dot{\mathcal{H}} = 0$.  
The total energy is a summation of the Hamiltonian associated with the Finsler energy, $\mathcal{H}_{\mathcal{L}_e}$, and the potential energy $\psi$. The total energy and its derivative therefore become,
\begin{align}
\mathcal{H} = \mathcal{H}_{\mathcal{L}_e} + \psi, &&
    \dot{\mathcal{H}} = \frac{\partial \q}{\partial t}^{\top} \frac{\partial \mathcal{H}}{\partial \q} = \qdot^{\top}[\vec{M}_{\mathcal{L}_e}\qddot + \vec{\xi}_{\mathcal{L}_e} + \delta \psi].
\end{align}
To find $\alpha$ for which $\dot{\mathcal{H}} = 0$, we substitute $\qddot = \h + \f + \alpha \qdot$ into the derivative of the Hamiltonian and set this equal to zero,
<!-- \begin{subequations} -->
\begin{align}
    \dot{\mathcal{H}} &= \qdot^{\top}[\vec{M}_{\mathcal{L}_e}\qddot + \vec{\xi}_{\mathcal{L}_e} + \delta \psi] = 0, \\
    &= \qdot^{\top}[\vec{M}_{\mathcal{L}_e} \left( \h + \f + \alpha \qdot \right) + \vec{\xi}_{\mathcal{L}_e} + \delta \psi] = 0, \\
    &= \alpha (\qdot^{\top}\vec{M}_{\mathcal{L}_e}\qdot) + \qdot^{\top}\left( \vec{M}_{\mathcal{L}_e} \h + \vec{\xi}_{\mathcal{L}_e}\right) + \qdot^{\top}\left(\vec{M}_{\mathcal{L}_e} \f + \partial \psi \right) = 0.\\
    \alpha &= - \left(\frac{\qdot^{\top}}{\qdot^{\top}\vec{M}_{\mathcal{L}_e}\qdot}\right) [ \vec{M}_{\mathcal{L}_e}(\h +\f) + \vec{\xi}_{\mathcal{L}_e} ] - \left(\frac{\qdot^{\top}}{\qdot^{\top}\vec{M}_{\mathcal{L}_e}\qdot}\right) \partial \psi. \label{eq: alpha_appendix}
\end{align}
<!-- \end{subequations} -->
The expression for $\alpha$ is substituted into the system $\qddot = \h + \f + \alpha \qdot$, to obtain,
<!-- \begin{subequations} \label{eq: qddot_conservative} -->
\begin{align} \label{eq: qddot_conservative}
    \qddot &= energize_{\mathcal{H}}[\h+\f], \\
           &= \h + \f + \alpha \qdot, \\
           &= \underbrace{\h + \f \underbrace{- \left(\frac{\qdot \qdot^{\top}}{\qdot^{\top}\vec{M}_{\mathcal{L}_e}\qdot}\right) [ \vec{M}_{\mathcal{L}_e}(\h +\f) + \vec{\xi}_{\mathcal{L}_e} ]}_{\bar{\alpha}}}_{energize_{\mathcal{H}_{\mathcal{L}_e}}[\h+\f]} \underbrace{- \left(\frac{\qdot \qdot^{\top}}{\qdot^{\top}\vec{M}_{\mathcal{L}_e}\qdot}\right) \partial \psi}_{\gamma \text{ with } \beta=0}. \label{eq:}
\end{align}
<!-- \end{subequations} -->
Analyzing Eq. \eqref{eq: qddot_conservative}, the system can be split into the energized system of $\qddot = \h +\f$ with the Finsler energy $\mathcal{L}_e$ and corresponding energization vector $\bar{\alpha}$, and the term $\gamma$ where $\beta=0$.
By adding damping to Eq. \eqref{eq: qddot_conservative}, we obtain the damped system as represented in Eq. \eqref{eq: qddot_theoremIII5}. In Step 1b, it is proven that the damped system decreases energy and converges to $\dot{\mathcal{H}} \rightarrow 0$, since $\mathcal{H}$ is decreasing and lower bounded, leading to $\qdot \rightarrow \vec{0}$ and $\qddot \rightarrow \vec{0}$ as time goes to infinity. 
<br><br>
<b>Step 1b</b>: Damping is added to Eq. \eqref{eq: qddot_conservative} via $-\beta \qdot$ with $\beta>0$,
\begin{equation}
    \qddot = \h + \f + \alpha \qdot - \beta \qdot.
\end{equation}
As the derivative of the Hamiltonian is zero for $\beta=0$, this leads to the following derivative of the Hamiltonian for the damped system,
<!-- \begin{subequations} \label{eq: Hdot_damped} -->
\begin{align} \label{eq: Hdot_damped}
    \dot{\mathcal{H}} &= \qdot^{\top}[\vec{M}_{\mathcal{L}_e}\qddot + \vec{\xi}_{\mathcal{L}_e} + \delta \psi] - \beta \qdot^{\top} \vec{M}_{\mathcal{L}_e} \qdot, \\
    &= - \beta \qdot^{\top} \vec{M}_{\mathcal{L}_e} \qdot.
\end{align}
<!-- \end{subequations} -->
As $\vec{M}_{\mathcal{L}_e}$ is strictly positive, Eq. \eqref{eq: Hdot_damped} is less than zero for all $\qdot \neq \vec{0}$ and zero for $\qdot = \vec{0}$. Since the total energy $\mathcal{H}$ is always decreasing and lower bounded by zero, 
the rate of the decrease must converge to zero, $\dot{\mathcal{H}} \rightarrow 0$, which means that 
$\dot{\mathcal{H}} = -\beta \qdot^{\top}\vec{M}_{\mathcal{L}_e}\qdot \rightarrow 0$ converges to zero, and therefore $\qdot \rightarrow \vec{0}$ leading to $\qddot \rightarrow \vec{0}$. 
<br><br>
<b>Step 2</b>: The second step is to ensure convergence of the system in Eq. \eqref{eq: qddot_theoremIII5} to the zero set of the navigation policy $\f$. For the CPM, this ensures that the system Eq. \eqref{eq: system_CPM} converges to the zero set of the pulled dynamical system of PUMA ($\qddot = \f^{\mathcal{C}}_{\theta}(\q, \qdot)$, Eq. 6 in our paper) which contains the desired goal. 
To explore convergence of Eq. \eqref{eq: qddot_theoremIII5} over infinite time to the zero set of $\f$, we take the limit with $\qdot, \qddot \rightarrow \vec{0}$,
<!-- \begin{subequations} \label{eq: limit_qddot} -->
    \begin{align} \label{eq: limit_qddot}
    \qddot &= \h + \f + \alpha \qdot - \beta \qdot,\\
           &= \h + \f - \frac{\qdot \qdot^{\top}}{\qdot^{\top}\vec{M}_{\mathcal{L}_e}\qdot} [ \vec{M}_{\mathcal{L}_e}(\h +\f) + \vec{\xi}_{\mathcal{L}_e} ] - \frac{\qdot \qdot^{\top}}{\qdot^{\top}\vec{M}_{\mathcal{L}_e}\qdot} \partial \psi - \beta \qdot,\\
    &= \h - \frac{\qdot \qdot^{\top}}{\qdot^{\top}\vec{M}_{\mathcal{L}_e}\qdot}[ \vec{M}_{\mathcal{L}_e}\h + \vec{\xi}_{\mathcal{L}_e} ]- \beta \qdot +  \f - \frac{\qdot \qdot^{\top}}{\qdot^{\top}\vec{M}_{\mathcal{L}_e}\qdot} \left(\vec{M}_{\mathcal{L}_e} \f + \partial \psi \right),\label{eq: limit_qddot_c}\\
    \xrightarrow[t \rightarrow \infty]{}\ \vec{0}       &= \underbrace{energize_{\mathcal{H}_{\mathcal{L}_e}}[\h]- \beta \qdot }_{\xrightarrow[t \rightarrow \infty]{}\ \vec{0}}+  \f - \frac{\qdot \qdot^{\top}}{\qdot^{\top}\vec{M}_{\mathcal{L}_e}\qdot} \left(\vec{M}_{\mathcal{L}_e} \f + \partial \psi \right),\label{eq: limit_qddot_d}\\
    \xrightarrow[t \rightarrow \infty]{}\ \vec{0}  &= \f - \frac{\qdot \qdot^{\top}}{\qdot^{\top}\vec{M}_{\mathcal{L}_e}\qdot} \left(\vec{M}_{\mathcal{L}_e} \f + \partial \psi \right). \label{eq: limit_qddot_e} 
    \end{align}
<!-- \end{subequations} -->
In the limit, both $\beta\qdot \rightarrow \vec{0}$ and $energize_{\mathcal{H}_{\mathcal{L}_e}}[\h]$ converge to zero in Eq. \eqref{eq: limit_qddot_d}.
In the following, we will elaborate why the equality in Eq. \eqref{eq: limit_qddot_e} requires $\f=\vec{0}$ in the limit.
<br><br>
The fraction $\frac{\qdot \qdot^{\top}}{\qdot^{\top}\vec{M}_{\mathcal{L}_e}\qdot}$ in Eq. \eqref{eq: limit_qddot_e} has two occurances of $\qdot$ both in the numerator and denominator. As $\vec{M}_{\mathcal{L}_e}$ is positive definite and bounded, the fraction in the limit becomes,
\begin{equation} \label{eq: A_limit}
    \lim_{t \rightarrow \infty}\ \frac{\qdot \qdot^{\top}}{\qdot^{\top}\vec{M}_{\mathcal{L}_e}\qdot} = \vec{A} = \frac{\vec{v}\vec{v}^{\top}}{\vec{v}^{\top}\vec{M}_{\mathcal{L}_e}\vec{v}}  \ \ \ \  \text{where} \ \ \ \ \vec{v} = \lim_{t \rightarrow \infty} \frac{\qdot}{\norm{\qdot}}.
 \end{equation}
 Using the definition for $\vec{A}$ in Eq. \eqref{eq: A_limit}, Eq. \eqref{eq: limit_qddot_e} can be rewritten as,
 \begin{equation} \label{eq: limit_lambdas}
     \xrightarrow[t \rightarrow \infty]{}\ \vec{0}  = \underbrace{[\vec{I} - \vec{A} \vec{M}_{\mathcal{L}_e}] \f}_{\lambda_1} + \underbrace{\vec{A}(\delta \psi)}_{\lambda_2},
 \end{equation}
In the limit, the term $[\vec{I} - \vec{A} \vec{M}_{\mathcal{L}_e}]$ has nullspace $\vec{v}$ as $[\vec{I} - \vec{A} \vec{M}_{\mathcal{L}_e}]\vec{v} = \vec{0}$,
 \begin{equation} \label{eq: spanv}
     [\vec{I} - \vec{A} \vec{M}_{\mathcal{L}_e}] \vec{v} = \vec{v} - \frac{\vec{v} \vec{v}^{\top}}{\vec{v}^{\top}\vec{M}_{\mathcal{L}_e}\vec{v}} \vec{M}_{\mathcal{L}_e}\vec{v} = \vec{v} - \vec{v} \frac{\vec{v} \vec{M}_{\mathcal{L}_e}\vec{v}^{\top}}{\vec{v}^{\top}\vec{M}_{\mathcal{L}_e}\vec{v}} = \vec{v} - \vec{v} = \vec{0},
 \end{equation}
which implies that $\lambda_1$ and $\lambda_2$ in Eq. \eqref{eq: limit_lambdas}, are orthogonal, $\lambda_1 \perp \lambda_2$. Both terms must be zero, $\lambda_1 = \vec{0}, \ \lambda_2 = \vec{0}$ for Eq. \eqref{eq: limit_lambdas} to hold. By contradiction, it is proven that $\f$  is equal to zero as time goes to infinity.
<br><br>
<b>Proof by contradiction</b>: Let us assume that $\f \neq \vec{0}$. 
First, note that if $\f \neq \vec{0}$, for $\lambda_1$ to be zero, $\f$ must be in the nullspace of $[\vec{I} - \vec{A} \vec{M}_{\mathcal{L}_e}]$, which we have already noted is  equal to $\vec{v}$. As a consequence, $\f \in \text{span}(\vec{v})$.
In contrast, for $\lambda_2$ to be equal to zero, i.e., $\vec{A}(\partial \psi) = \vec{0}$, two cases exist:
<ol>
    <li><b>Case 1</b>: The gradient of the potential is equal to zero, $\partial \psi = \vec{0}$. For $\f \neq \vec{0}$, this case cannot hold, as the potential is a compatible potential of $\f$, which indicates that $\partial \psi = \vec{0}$ if only if $\f = 0$, which would lead to a contradiction. </li>
    <li><b>Case 2</b>: The other possibility is that $\partial \psi$ is in the nullspace of $\vec{A}$, which implies that $\partial \psi \perp \vec{v}$. Consequently, since $\f \in \text{span}(\vec{v})$, $\partial \psi \perp \vec{v}$ implies that $\partial \psi \perp \f$; hence, $\partial \psi^{\top}\f=0$. However, a compatible potential also has the property $-\partial \psi^{\top} \f>\vec{0}$ wherever $\f \neq \vec{0}$, which once again leads to a contradiciton.</li>
</ol>
As a result, since both possible cases lead to a contradiction for $\f \neq 0$, $\f$ must be zero in the limit. 
<br><br>
</div>
<h4 id=proof>Discussion</h4>
<div>
Let's take a closer look at the implications of the assumptions on $\vec{M}_{\mathcal{L}_{e}}$. 
For a fabric describing collision avoidance, two cases exist as the Spec describing the fabric must be boundary conforming<span class="citation" onclick="document.getElementById('ratliff2020optimization').scrollIntoView();"><sup>[2]</sup></span>: (1) The metric $\vec{M}_{\mathcal{L}_{e}}$ is finite along the Eigen-directions parallel with the boundary's tangent space but goes to infinite along directions orthogonal to the tangent space. (2) The metric $\vec{M}_{\mathcal{L}_{e}}$ is a finite matrix along all trajectories, implying that $\vec{M}_{\mathcal{L}_{e}}$ is also finite in the limit when $t\rightarrow \infty$. Observing the assumption on $\vec{M}_{\mathcal{L}_{e}}$ in the \ac{cpm} that the metric is bounded in a finite region and strictly positive definite everywhere, only fabrics can be designed following the second case. This implies that in the limit we ensure convergence to the zero set of the forcing policy $\f^{\mathcal{C}}_{\theta}(\q, \qdot)$, but collision avoidance is not guaranteed as barrier-like functions going to infinity on the boundary, cannot be used to construct $\vec{M}_{\mathcal{L}_e}$
<br><br>
The metric $\vec{M}_{\mathcal{L}_e}$ is additionally assumed to not vanish in the limit $\qdot \rightarrow \vec{0}$. In practice, numerical instability of the fraction $\frac{\qdot \qdot^{\top}}{\qdot^{\top}\vec{M}_{\mathcal{L}_e}\qdot}$ is avoided by replacing the denominator by $\qdot^{\top}\vec{M}_{\mathcal{L}_e}\qdot + \epsilon$ with $\epsilon>0$.
</div>
<h3> Illustration of TamedPUMA </h3>
<div>
This illustration of TamedPUMA shows the behavior design given the relationships between the different task and configuration-space variables. The joint angles and velocities get mapped into task space where the desired behavior is specified. Via fabrics, all avoidance behaviors are defined using the joint limits, and varying obstacle positions. The DNN captures the desired behavior of the end-effector position and orientation.
<br><br>
</div>
<div id="tamedpuma_illustration" class="image-div mb-3 d-flex justify-content-center">
    <img src="{{ '/assets/images/papers/pumafabrics/illustration_tamedpuma_28_11_2024_10.png' | relative_url}}" class="img-fluid" width="800" alt="lab">
</div>


<h2>References</h2>
<ol>
  <li id="ratliff2023fabrics">
    Ratliff, Nathan, and Van Wyk, Karl. (2023). "Fabrics: A Foundationally Stable Medium for Encoding Prior Experience." <em>arXiv preprint arXiv:2309.07368</em>.
  </li>
<li id="ratliff2020optimization">
  Ratliff, Nathan D., Van Wyk, Karl, Xie, Mandy, Li, Anqi, and Rana, Muhammad Asif. (2020). "Optimization fabrics." <em>arXiv preprint arXiv:2008.02399</em>.
</li>
</ol>