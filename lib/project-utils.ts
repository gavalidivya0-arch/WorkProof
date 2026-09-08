export interface ProjectSnapshot {
  name: string;
  role: string;
  description: string;
  startDate: Date | string;
  endDate: Date | string | null;
  deliverables: string[];
  skills: string[];
}

export function isProjectModified(currentProject: any, verificationSnapshot: string): boolean {
  try {
    const snapshot: ProjectSnapshot = JSON.parse(verificationSnapshot);
    
    // Normalize fields for comparison
    const sName = snapshot.name.trim();
    const cName = currentProject.name.trim();
    
    const sRole = snapshot.role.trim();
    const cRole = currentProject.role.trim();
    
    const sDesc = snapshot.description.trim();
    const cDesc = currentProject.description.trim();
    
    const sStart = new Date(snapshot.startDate).toISOString().split('T')[0];
    const cStart = new Date(currentProject.startDate).toISOString().split('T')[0];
    
    const sEnd = snapshot.endDate ? new Date(snapshot.endDate).toISOString().split('T')[0] : null;
    const cEnd = currentProject.endDate ? new Date(currentProject.endDate).toISOString().split('T')[0] : null;
    
    // Compare basic fields
    if (sName !== cName) return true;
    if (sRole !== cRole) return true;
    if (sDesc !== cDesc) return true;
    if (sStart !== cStart) return true;
    if (sEnd !== cEnd) return true;
    
    // Compare deliverables
    const cDeliverables = currentProject.deliverables?.map((d: any) => d.title) || [];
    if (snapshot.deliverables.length !== cDeliverables.length) return true;
    
    const sortedSD = [...snapshot.deliverables].sort();
    const sortedCD = [...cDeliverables].sort();
    if (!sortedSD.every((val, index) => val === sortedCD[index])) return true;
    
    // Compare skills
    const cSkills = currentProject.skills?.map((s: any) => s.skill?.name || s.name) || [];
    if (snapshot.skills.length !== cSkills.length) return true;
    
    const sortedSS = [...snapshot.skills].sort();
    const sortedCS = [...cSkills].sort();
    if (!sortedSS.every((val, index) => val === sortedCS[index])) return true;
    
    return false;
  } catch (error) {
    console.error("Failed to parse verification snapshot for comparison", error);
    return false; // Fail open (don't mark as modified if we can't parse it)
  }
}
