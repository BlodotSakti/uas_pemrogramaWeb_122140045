from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from .meta import Base

class Task(Base):
    __tablename__ = 'tasks'
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    matkul_id = Column(Integer, ForeignKey('subjects.id'), nullable=False)
    tenggat = Column(Date, nullable=False)
    status = Column(String, nullable=False)  # 'selesai', 'dikerjakan', 'belum'
    matkul = relationship("Subject", back_populates="tasks")